define(['Promisify','ErrorInterceptor','LegalEntityPermission_Form_Extn'], function(Promisify, ErrorInterceptor,LegalEntityPermissionExtn) {
    var legalEntityName;  
     /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function PresentationController() {
      kony.mvc.Presentation.BasePresenter.call(this);
      this.globalDetails={country:[],region:[],city:[]};
      this.companyViewModel = {searchData:null};
      this.CustomerAccounts = null;
      this.isAccountCentricCore = true;
      this.AddUserAccountsFeatures = {};
      this.contractData={         
          features: [],
          ServiceDefinitionRecords:[]
        };
      this.alreadyContractsCalled = [];
      this.CustomerBasicInforObj = {};
      this.customerSearchRecords = [];
      this.CustomerContactNumListData = [];
      this.CustomerEmailIdsListData = [];
      this.isEmailSearch = false;
      this.AddressData ={
        countries: [],
        regions: [],
      };
      this.cacheDataFlag={
        contractFeaturesLimits:null,
        fetchUpdatedFeatures: true,
        contractUsers:[],
        fetchContractUsers:true
      };
    }
   

    inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);

    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    PresentationController.prototype.initializePresentationController = function() {
      var self = this;
      //self.getAccountCentricCore();
    };
  PresentationController.prototype.callContractsScreen = function() {
      this.alreadyContractsCalled = [];
     };
  PresentationController.prototype.showCompanies = function(context) {
    var self = this;
      self.showLoadingScreen();
      if(context){}
      else{
        context = {action : "fetch"};
      }
      self.presentUserInterface("frmCompanies",context);
  };
  
    /*
    * fetch core type configuration
    */
    PresentationController.prototype.getAccountCentricCore = function() {
      var self =this;
      function onSuccess(response){
        self.isAccountCentricCore = response.isAccountCentricCore;
      }
      function OnError(err){
        self.isAccountCentricCore = true;
        console.log("----ERROR: fetching config type " +err);
      }
      this.businessController.getCoreTypeInformation({},onSuccess,OnError);
    };
  
    PresentationController.prototype.navigateToCreateCustomerScreen = function(context) {
        var self = this;
        context.companyID=self.companyId;
        self.navigateTo('CustomerCreateModule', 'showCreatecompanyScreen',[context]);
    };
    /*
    * navigate to edit customer form
    * @param: {"id": "","DateOfBirth": "","DrivingLicenseNumber": "","FirstName": "","LastName": "","Lastlogintime": "","MiddleName":"","Ssn": "","UserName": "","createdts": "","role_name": "","status": "","Email": "","Phone": "",
	          "company": {"UserName": "","id": "","TypeId": "TYPE_ID_SMALL_BUSINESS"}}
              navigationParams - {"selectTab":""}
    */
    PresentationController.prototype.navigateToEditCustomerScreen = function(context,navigationParams) {
        var self = this;
        if(navigationParams){
          context['isAccountCentricConfig'] = self.isAccountCentricCore;
        }
        self.navigateTo('CustomerCreateModule', 'showEditCustomerScreen',[context, navigationParams]);
    };
    /*
    * navigate to customer profile
    * @param: param- {"Customer_id":""}
              formDetails - {"name":""}
    */
    PresentationController.prototype.navigateToCustomerPersonal = function(param,formDetails) {
        var self = this;
        var context = [param.Customer_id,param.legalEntityId,formDetails];
        self.navigateTo('CustomerManagementModule', 'diplayCustomerProfileFromOtherModule',context);
    };  
    PresentationController.prototype.showResultFromCustomerScreen = function(context,isLoading,toast) {
        var self = this;
        if(isLoading) self.showLoadingScreen();
        self.presentContractScreen(toast);
        if (context) self.showCompanies(context);
    };
    PresentationController.prototype.showLoadingScreen = function(formName) {
        var self = this;
      if(formName){
        self.presentUserInterface(formName,{"loadingScreen":{"focus":true}});
      } else{
        self.presentUserInterface("frmCompanies",{"loadingScreen":{"focus":true}});
      }
    };
    PresentationController.prototype.hideLoadingScreen = function(formName) {
        var self = this;
      if(formName){
        self.presentUserInterface(formName,{"loadingScreen":{"focus":false}});
      } else{
        self.presentUserInterface("frmCompanies",{"loadingScreen":{"focus":false}});
      }
    };
    PresentationController.prototype.showToastMessage = function(status,message,formName) {
        var self = this;
      if(formName){
        self.presentUserInterface(formName,{"toastMessage":{"status":status,
                                                                  "message":message}});
      } else{
        self.presentUserInterface("frmCompanies",{"toastMessage":{"status":status,
                                                                  "message":message}});
      }
    };
    PresentationController.prototype.getAddressSuggestion=function(text,onSucess,OnError){
       var context={
         "input":text,
       };
      this.businessController.getAddressSuggestion(context,onSucess,OnError);
    };
    PresentationController.prototype.getPlaceDetails=function(PlaceId,onSucess,OnError){
       var context={
         "placeid":PlaceId,
       };
      this.businessController.getPlaceDetails(context,onSucess,OnError);
    };
  
  PresentationController.prototype.fetchLocationPrefillData = function(callback) {
    var self = this;
    var promiseFetchCountryList = Promisify(this.businessController, 'fetchCountryList');
    if(self.AddressData.countries.length === 0){
      Promise.all([
        promiseFetchCountryList({})
      ]).then(function (responses) {
        self.AddressData.countries = responses[0];
        if (typeof callback === 'function') callback(self.AddressData);
      }).catch(function (res) {
        callback("error");
        kony.print("unable to fetch preloaded data",res);
      });
    } else{
      if (typeof callback === 'function') callback(self.AddressData);
    }
  };
   PresentationController.prototype.presentContractScreen = function(context, formName){
     var self = this;
     if(formName){
       self.presentUserInterface(formName,context);
     }else{
       self.presentUserInterface("frmCompanies",context);
     }
   };

  PresentationController.prototype.createCompany = function (context) {
    var self = this; 

    function completionCreateCompanyCallback(response) {
	if(response['status'] === "Failure"){
       self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(response));
       self.hideLoadingScreen();
      }else{
        self.companyId=response.id;
       self.presentUserInterface("frmCompanies",{
         "createCompanySuccess":response
       });
      }
    }

    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
      self.hideLoadingScreen();
    }
    this.showLoadingScreen();
    this.businessController.createCompany(context, completionCreateCompanyCallback, onError);
  };
  
  PresentationController.prototype.getAllAccounts = function (context) {
    var self = this; 
    function completionFetchAccountsCallback(response) {
       self.presentUserInterface("frmCompanies",{
         "accountSearch":response.Accounts? response.Accounts : []
       });
      self.hideLoadingScreen();
    }

    function onError(error) {
       self.presentUserInterface("frmCompanies",{
         "accountSearch":[]
       });
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
      self.hideLoadingScreen();
    }
    this.showLoadingScreen();
    this.businessController.getAllAccounts(context, completionFetchAccountsCallback, onError);
  };
  PresentationController.prototype.getCompanyDetails = function (context,success,error) {
    var self = this;
    var onSuccess = function(res){
      var detailContext = {
        "CompanyContext" : res.OrganisationDetails,
        "OwnerContext" : res.OrganisationOwnerDetails
      };
      self.hideLoadingScreen();
      success(detailContext);
    };
    var onError = function(err){
      self.hideLoadingScreen();
      kony.print("getCompanyDetails(presentation controller): not able to fetch company details",err);
      error(err);
    };
    this.showLoadingScreen();
    this.businessController.getCompanyDetails(context,onSuccess,onError);
  };
  PresentationController.prototype.getCompanyAccounts = function (context,success,error) {
    var self = this;
    var onSuccess = function(res){
      self.CustomerAccounts = res.OgranizationAccounts; 
      var accountContext = {
        "accountContext" : res.OgranizationAccounts
      };
      success(accountContext);
      self.hideLoadingScreen();
    };
    var onError = function(err){
      self.hideLoadingScreen();
      kony.print("getCompanyAccounts(presentation controller): not able to fetch acocunts ",err);
      error(err);
    };  
    this.showLoadingScreen();
    this.businessController.getCompanyAccounts(context,onSuccess,onError);
  };
  PresentationController.prototype.getCompanyCustomers = function (context,success,error) {
    var self = this;
    var onSuccess = function(res){
      var customerContext = {
        "customerContext" : res.organizationEmployee
      };
      success(customerContext);
      self.hideLoadingScreen();
    };
    var onError = function(err){
      self.hideLoadingScreen();
      kony.print("getCompanySignatories(presentation controller): not able to fetch customers",err);
      error(err);
    };  
    this.showLoadingScreen();
    this.businessController.getCompanySignatories(context,onSuccess,onError);
  };
  PresentationController.prototype.getCompanyFeatures = function(context,success,error,frmName){
    //this.showLoadingScreen();
    if(frmName === "frmEnrollmentRequests")
      this.showRequestsLoadingScreen();
    else
      this.showLoadingScreen();
    var self = this;
    var onSuccess = function(res){
      success(res.FeatureActions);
      //self.hideLoadingScreen();
      if(frmName === "frmEnrollmentRequests")
        self.hideRequestsLoadingScreen();
      else
        self.hideLoadingScreen();
    };
    var onError = function(err){
      error(err);
      //self.hideLoadingScreen();
      if(frmName === "frmEnrollmentRequests")
        self.hideRequestsLoadingScreen();
      else
        self.hideLoadingScreen();
    };
    this.businessController.getCompanyFeaturesActionsLimits({"organization_id":context.id},onSuccess,onError);
  };
  PresentationController.prototype.showCompaniesForm = function(context) {
    this.currentForm = "frmCompanies";
    this.presentUserInterface('frmCompanies', context);
  };
  PresentationController.prototype.showCreateContractForm = function(context) {
    this.currentForm = "frmContractCreate";
    this.showLoadingScreen(this.currentForm);
    this.presentUserInterface('frmContractCreate', context);
  };
  PresentationController.prototype.hideLocationsLoadingScreen = function() {
    this.showCompaniesForm({
      action: "hideLoadingScreen"
    });
  };  
  /*
  * showCompaniesFromCustomerModule
  * @param: {"id":"","selectTab":""}
  */
  PresentationController.prototype.showCompaniesFromCustomerModule = function (context) {
    var self = this;
    self.presentUserInterface("frmCompanies",{"action":"hideScreens"});
    self.showLoadingScreen();
    function onSuccess(response){
      self.presentUserInterface("frmCompanies",{"businessTypes":response.BusinessTypeRecords});
      self.getAllFeatures({
        action : "getAllFeatures"
      });
      self.getCompanyAllDetails(context);
    }
    function OnError(err){
      self.hideLocationsLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(err));
    }
    this.businessController.getBusinessTypes({},onSuccess,OnError);
    
  };
  PresentationController.prototype.getContractDetails = function(context){
    var self = this;
    self.showLoadingScreen();
    function onSuccess(response){
      self.presentUserInterface("frmCompanies",{"contractCustomers":response.contractCustomers,
                                                "serviceDef" : {
                                                  "name" : response.servicedefinitionName,
                                                  "id" : response.servicedefinitionId}});
      self.hideLocationsLoadingScreen();
    }
    function OnError(err){
      self.hideLocationsLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(err));
    }
    this.businessController.getContractDetails(context,onSuccess,OnError);
  };
    PresentationController.prototype.getCoreCustomerDetails = function(context){
    var self = this;
    self.showLoadingScreen();
    function onSuccess(response){
      self.presentUserInterface("frmCompanies",{"coreCustomerDetails":response.CoreCustomer,
                                               });
      self.hideLocationsLoadingScreen();
    }
    function OnError(err){
      self.hideLocationsLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(err));
    }
    this.businessController.getCoreCustomerDetails(context,onSuccess,OnError);
  };
  /*
  * naviagtion to contracts form
  */
  PresentationController.prototype.navigateToContractScreen = function(context) {
    var self = this;
    self.navigateTo('CompaniesModule', 'showCompaniesForm',[context]);
  };
  /*
  * naviagtion to create contract form
  */
  PresentationController.prototype.navigateToContractCreateScreen = function(context) {
    var self = this;
    self.navigateTo('CompaniesModule', 'showCreateContractForm',[context]);
  };
  /*
  * naviagtion to search Contract form
  */
  PresentationController.prototype.navigateToSearchScreen = function(context) {
    var self = this;
    self.navigateTo('CompaniesModule', 'presentContractSearchScreen',[context]);
  };

  /*
  * getContractInformation
  * @param: {"id":"","selectTab":""}
  */
  
 PresentationController.prototype.getContractInformation= function (contractId,legalEntityId,formName,toastAction ) {
  this.showLoadingScreen(formName);
  var self = this;
  self.globalDetails = { };
  var promiseGetContractDetailsList = Promisify(this.businessController, 'getContractDetails');

  Promise.all([
      
      promiseGetContractDetailsList({
          "contractId": contractId,
          "legalEntityId":legalEntityId
      })
  ]).then(function(responses) {
    //track if need to fetch tab data
      self.cacheDataFlag.fetchUpdatedFeatures = true;
      self.globalDetails.contractDetails = responses[0];    
      self.hideLocationsLoadingScreen();
      self.navigateToContractScreen({
          "action": "contractDetails",
          "contractDetails": self.globalDetails,
          "toast": toastAction
      });
    }).catch(function(res) {
        self.showCompaniesForm({"action":"editCancel"});
        self.hideLoadingScreen("frmContractSearch");
        self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(res),"frmContractSearch");
        kony.print("unable to fetch preloaded data", res);
    });	
  };
  /*
  * getContractFeatureActionLimits
  * @param: {"id":"","selectTab":""}
  */
 PresentationController.prototype.getContractFeatureActionLimits= function (contractId,legalEntityId , selectTab) {
  this.showLoadingScreen();
  var self = this;
   var payload = {"contractId": contractId,"legalEntityId":legalEntityId};	
   function onSuccess(response){
     self.cacheDataFlag.fetchUpdatedFeatures = false;
     self.cacheDataFlag.contractFeaturesLimits = response;   
     self.hideLocationsLoadingScreen();
     self.presentUserInterface("frmCompanies", {
       "action": "contractFeatureActionLimits",
       "contractFeatures": self.cacheDataFlag.contractFeaturesLimits,
       'selectTab' : selectTab
     });
   }
   function OnError(res){
     self.hideLocationsLoadingScreen();
     self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(res));
   }
   if(self.cacheDataFlag.fetchUpdatedFeatures === true){
      this.businessController.getContractFeatureActionLimits(payload,onSuccess,OnError);
   }else{
     onSuccess(self.cacheDataFlag.contractFeaturesLimits);
   }
  
  };
   /*
  * getContractInfinityUsers
  * @param: {"id":"","selectTab":""}
  */

 PresentationController.prototype.getContractInfinityUsers= function (contractId) {
  this.showLoadingScreen();
  var self = this;
  self.globalDetails = { };
  var promiseGetInfinityUsersList = Promisify(this.businessController, 'getContractInfinityUsers');

  Promise.all([   
      promiseGetInfinityUsersList({
        "contractId": contractId
    })
  ]).then(function(responses) {
    self.globalDetails.signatoryUsers = responses && responses[0].contractUsers ? responses[0].contractUsers :[];    
      self.hideLocationsLoadingScreen();
      self.presentUserInterface("frmCompanies", {
          "action": "contractInfinityUsers",
          "contractDetails": self.globalDetails.signatoryUsers
      });
    }).catch(function(res) {
        self.hideLocationsLoadingScreen();
        self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(res));
        kony.print("unable to fetch preloaded data", res);
    });	
  };
  /*
  * getContractApprovalMatrix
  * @param: {"id":"","selectTab":""}
  */
 PresentationController.prototype.getContractApprovalMatrix= function (contractId) {
  this.showLoadingScreen();
  var self = this;
  self.globalDetails = { };
  var promiseGetApprovalMatrixList = Promisify(this.businessController, 'getCompanyApprovalLimits');

  Promise.all([   
    promiseGetApprovalMatrixList({
      "Organization_id": contractId
    })
  ]).then(function(responses) {
    self.globalDetails.approvalsContext = {
          "contractId": "2778633596",
          "cifs": [
            {
            "cifId":"123456",
            "cifName":"Temenos",
            "accounts": [
                  {
                      "accountId": "201201093934282",
                      "limitTypes": [
                          {
                              "limitTypeId": "DAILY_LIMIT",
                              "actions": [
                                  {
                                      "featureName": "Transfer between customer own accounts",
                                      "featureStatus": "SID_FEATURE_ACTIVE",
                                      "actionId": "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE",
                                      "actionDescription": "Fund Transfer between different eligible accounts of a member",
                                      "featureId": "TRANSFER_BETWEEN_OWN_ACCOUNT",
                                      "limits": [
                                          {
                                              "numberOfApprovals": -1,
                                              "approvalRuleId": "ALL",
                                              "approvers": [
                                                  {
                                                      "approverId": "1598333826",
                                                      "approverName": "kalyanigurrapu G"
                                                  }
                                              ],
                                              "approvalRuleName": "All Approvals",
                                              "lowerlimit": "0.00",
                                              "upperlimit": "1000.00"
                                          }
                                      ],
                                      "actionName": "Transfer between customer own accounts - Create Transaction"
                                  }
                              ]
                          },
                          {
                              "limitTypeId": "MAX_TRANSACTION_LIMIT",
                              "actions": [
                                  {
                                      "featureName": "Transfer between customer own accounts",
                                      "featureStatus": "SID_FEATURE_ACTIVE",
                                      "actionId": "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE",
                                      "actionDescription": "Fund Transfer between different eligible accounts of a member",
                                      "featureId": "TRANSFER_BETWEEN_OWN_ACCOUNT",
                                      "limits": [
                                          {
                                              "numberOfApprovals": -1,
                                              "approvalRuleId": "ALL",
                                              "approvers": [
                                                  {
                                                      "approverId": "1598333826",
                                                      "approverName": "kalyanigurrapu G"
                                                  }
                                              ],
                                              "approvalRuleName": "All Approvals",
                                              "lowerlimit": "0.00",
                                              "upperlimit": "500.00"
                                          }
                                      ],
                                      "actionName": "Transfer between customer own accounts - Create Transaction"
                                  }
                              ]
                          },
                          {
                              "limitTypeId": "WEEKLY_LIMIT",
                              "actions": [
                                  {
                                      "featureName": "Transfer between customer own accounts",
                                      "featureStatus": "SID_FEATURE_ACTIVE",
                                      "actionId": "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE",
                                      "actionDescription": "Fund Transfer between different eligible accounts of a member",
                                      "featureId": "TRANSFER_BETWEEN_OWN_ACCOUNT",
                                      "limits": [
                                          {
                                              "numberOfApprovals": -1,
                                              "approvalRuleId": "ALL",
                                              "approvers": [
                                                  {
                                                      "approverId": "1598333826",
                                                      "approverName": "kalyanigurrapu G"
                                                  }
                                              ],
                                              "approvalRuleName": "All Approvals",
                                              "lowerlimit": "0.00",
                                              "upperlimit": "5000.00"
                                          }
                                      ],
                                      "actionName": "Transfer between customer own accounts - Create Transaction"
                                  }
                              ]
                          }
                      ]
                  }
              ]
            }
          ]
      };
        
      self.hideLocationsLoadingScreen();
      self.presentUserInterface("frmCompanies", {
          "action": "contractApprvMatrix",
          "contractDetails": self.globalDetails
      });
    }).catch(function(res) {
        self.hideLocationsLoadingScreen();
        self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(res));
        kony.print("unable to fetch preloaded data", res);
    });	
  };
  
  
  /*
  * getContractAllDetails
  * @param: {"id":"","selectTab":""}
  */
  
  
 PresentationController.prototype.getContractAllDetails= function (context) {
    this.showLoadingScreen();
    var self = this;
    self.globalDetails = { };
  var promiseGetContractDetailsList = Promisify(this.businessController, 'getContractDetails');
  var promiseGetContractFeaturesLimitsList = Promisify(this.businessController, 'getContractFeatureActionLimits');    
  var promiseGetInfinityUsersList = Promisify(this.businessController, 'getContractInfinityUsers');
  var promiseGetApprovalMatrixList = Promisify(this.businessController, 'getCompanyApprovalLimits');
  
  Promise.all([
      
      promiseGetContractDetailsList({
          "contractId": context.contractId
      }),
      promiseGetContractFeaturesLimitsList({
          "contractId": context.contractId
      }),
      promiseGetInfinityUsersList({
          "contractId": context.contractId
      }),
      promiseGetApprovalMatrixList({
          "Organization_id": context.contractId
      })
  ]).then(function(responses) {
      self.globalDetails.contractDetails = responses[0];
      self.globalDetails.accountsFeatures = responses[1];        
      self.globalDetails.signatoryUsers = responses[2];        
      
      self.hideLocationsLoadingScreen();
      self.presentUserInterface("frmCompanies", {
          "action": "contractDetails",
          "contractDetails": self.globalDetails,
          "selectedTabNo": context.selectTab
      });
    }).catch(function(res) {
        self.hideLocationsLoadingScreen();
        self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(res));
        kony.print("unable to fetch preloaded data", res);
    });	
  };
  /*
  * getCompanyAllDetails
  * @param: {"id":"","selectTab":""}
  */
  PresentationController.prototype.getCompanyAllDetails = function (context) {
    this.showLoadingScreen();
    var self = this;
    self.globalDetails = {
      CompanyContext: null,
      OwnerContext: null,
      accountContext: null,
//       customerContext: null,
      featuresContext: null
    };
    var promiseGetCompanyDetailsList = Promisify(this.businessController, 'getCompanyDetails');
    var promiseGetCompanyAccountsList = Promisify(this.businessController, 'getCompanyAccounts');
    var promiseGetCompanyCustomersList = Promisify(this.businessController, 'getCompanySignatories');
    var promiseGetFeaturesActionsList = Promisify(this.businessController, 'getCompanyFeaturesActionsLimits');
    var promiseGetApprovalMatrixList = Promisify(this.businessController, 'getCompanyApprovalLimits');
    
    Promise.all([
      promiseGetCompanyDetailsList({"id":context.id}),
      promiseGetCompanyAccountsList({"Organization_id":context.id}),
      promiseGetCompanyCustomersList({"Organization_id":context.id}),
      promiseGetFeaturesActionsList({"organization_id":context.id}),
      promiseGetApprovalMatrixList({"Organization_id":context.id})
    ]).then(function (responses) {
      self.globalDetails.CompanyContext = responses[0].OrganisationDetails;
      self.globalDetails.OwnerContext = responses[0].OrganisationOwnerDetails;
      self.globalDetails.accountContext = responses[1].OgranizationAccounts;
      self.globalDetails.customerContext = responses[2].organizationEmployee;
      self.globalDetails.featuresContext = responses[3].FeatureActions; 
      self.globalDetails.approvalsContext = responses[4].accounts; 
      self.CustomerAccounts = responses[1].OgranizationAccounts; 
      self.hideLocationsLoadingScreen();
      self.presentUserInterface("frmCompanies",{"action":"companyDetails",
                                                "companyDetails":self.globalDetails,
                                                "selectedTabNo": context.selectTab});
    }).catch(function (res) {
      self.hideLocationsLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(res));
      kony.print("unable to fetch preloaded data",res);
    });	
  };
  PresentationController.prototype.validateTIN = function (context,callback) {
    var self = this; 

    function completionvalidateTinCallback(response) {
       self.presentUserInterface("frmCompanies",{
         "tinValidation":response
       });
      self.hideLoadingScreen();
      if(callback && callback instanceof Function){
        callback();
      }
    }

    function onError(err) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),err.dbpErrMsg);
      self.hideLoadingScreen();
      if(callback && callback instanceof Function){
        callback();
      }
    }
    this.showLoadingScreen();
    this.businessController.validateTIN(context, completionvalidateTinCallback, onError);
  };
  
  PresentationController.prototype.getCompaniesSearch = function(payload) {
    var self = this; 

    function onSuccess(response) {
      self.companyViewModel.searchData = response.OrganisationDetails;
      self.hideLoadingScreen();
      self.presentContractScreen(self.companyViewModel);
    }

    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
      self.hideLoadingScreen();
    }
    this.showLoadingScreen();
    this.businessController.getCompaniesSearch(payload, onSuccess, onError);
  };

  PresentationController.prototype.editCompany = function (context) {
    var self = this; 

    function completionEditCompanyCallback(response) {
      if(response['status'] == "Failure"){
       self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(response));
       self.hideLoadingScreen();
      }else{
       response.id = context.id;
       self.presentUserInterface("frmCompanies",{
         "editCompanySuccess":response
       });
      }
    }

    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
      self.hideLoadingScreen();
    }
    this.showLoadingScreen();
    this.businessController.editCompany(context, completionEditCompanyCallback, onError);
  };
  PresentationController.prototype.unlinkAccounts = function (context,success,error) {
    var self = this;
    var onSuccess = function(res){
      self.hideLoadingScreen();
      success(res);
    };
    var onError = function(err){
      self.hideLoadingScreen();
      error(err);
    };
    this.showLoadingScreen();
    this.businessController.unlinkAccounts(context, onSuccess, onError);
  };
  /**
     * @name getAccountTransactions
     * @member CustomerManagementModule.presentationController
     * @param {AccountNumber : string, StartDate : string, EndDate : string} data
     */
  PresentationController.prototype.getAccountTransactions = function (data) {
    var self = this;
    self.showLoadingScreen();

    function successCallback(response) {
      self.hideLoadingScreen();
      self.AccountTrasactions = response.Transactions;
      self.presentContractScreen({"AccountTrasactions": self.AccountTrasactions});
    }
    function failureCallback(response) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(response));
    }

    self.businessController.getCustomerTransactions(data, successCallback, failureCallback);

  };

  /**
     * @name getCustomerAccountInfo
     * @member CompaniesModule.presentationController
     * @param string accountID
     */
  PresentationController.prototype.getCustomerAccountInfo = function (accountID) {
    return this.CustomerAccounts.filter(function (x) { return x.Account_id === accountID; });
  };
  PresentationController.prototype.getAllFeatures = function (context) {
    var self = this;
    function successCallback(res){
      context.features = res;
      self.presentUserInterface("frmCompanies",context);
    }
    function errorCallback(err){
      kony.print("erro while fetching features ",err);
    }
    self.businessController.getAllFeatures({},successCallback,errorCallback);
  };
  PresentationController.prototype.getMonetaryActions = function (payload,success,error) {
    var self = this;
    function successCallback(res){
      success(res);
    }
    function errorCallback(err){
      error(err);
    }
    self.businessController.getMonetaryActions(payload,successCallback,errorCallback);
  };
  PresentationController.prototype.suspendFeature = function (payload,success,error,frmName) {
    var self = this;
    //self.showLoadingScreen();
    if(frmName === "frmEnrollmentRequests")
      self.showRequestsLoadingScreen();
    else
      self.showLoadingScreen();
    function successCallback(res){
      success(res);
    }
    function errorCallback(err){
      error(err);
    }
    self.businessController.suspendFeature(payload,successCallback,errorCallback);
  };    
   /**
     * @name getMembershipDetails
     * @member CompaniesModule.presentationController
     * @param: Object {"Membership_id": ""}
     */
  PresentationController.prototype.getMembershipDetails = function (payload) {
    var self = this;
    self.showLoadingScreen();
    function successCallback(response){
      self.hideLoadingScreen();
      self.presentUserInterface("frmCompanies",{"membershipDetails": response});
    }
    function errorCallback(err){
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(err));
    }
    self.businessController.getMembershipDetails(payload,successCallback,errorCallback);
  };    
  
  //BusinessTypes
  PresentationController.prototype.navigateToBusinessTypesUi = function() {
    var self = this;
    self.getBusinessTypes();
  };
  PresentationController.prototype.getBusinessTypes = function() {
    var self = this;  
    self.showBusinessTypeLoadingScreen();
    function successCallback(response) {
      self.hideBusinessTypeLoadingScreen();
      self.presentUserInterface("frmBusinessTypes", {"businessTypeRecords" : response.BusinessTypeRecords} );
    }
    function failureCallback(response) {
      self.hideBusinessTypeLoadingScreen();
      self.showBusinessTypeToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(response));
    }
    self.businessController.getBusinessTypes({}, successCallback, failureCallback);
  };
  PresentationController.prototype.geMaxAuthSignatories = function(context) {
    var self = this;  
    self.showLoadingScreen();
    function successCallback(response) {
      self.hideLoadingScreen();
      self.presentUserInterface("frmCompanies", {"businessTypeRecords" : response.BusinessTypeRecords} );
    }
    function failureCallback(response) {
      self.hideLoadingScreen();
      self.showBusinessTypeToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(response));
    }
    self.businessController.getBusinessTypes(context, successCallback, failureCallback);
  };
  PresentationController.prototype.deleteBusinessType = function(context) {
    var self = this;    
    self.showBusinessTypeLoadingScreen();
    function successCallback() {
      self.hideBusinessTypeLoadingScreen();
      self.showBusinessTypeToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),kony.i18n.getLocalizedString("i18n.frmBusinessTypes.message.deleteSuccessful"));
      self.getBusinessTypes();
    }
    function failureCallback(response) {
      self.hideBusinessTypeLoadingScreen();
      self.showBusinessTypeToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(response));
    }
    self.businessController.deleteBusinessType(context, successCallback, failureCallback);
  }; 
   PresentationController.prototype.updateBusinessType = function(context,action) {
    var self = this;    
    self.showBusinessTypeLoadingScreen();
    function successCallback() {
      self.hideBusinessTypeLoadingScreen();
      self.showBusinessTypeToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),kony.i18n.getLocalizedString("i18n.frmBusinessTypes.message.updateSuccessful"));
      if(action==="VIEW")
        self.presentUserInterface("frmBusinessTypes", {"action":action,"defaultRoleId":context.defaultRole});
      else 
        self.getBusinessTypes();
    }
    function failureCallback(response) {
      self.hideBusinessTypeLoadingScreen();
      self.showBusinessTypeToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(response));
    }
    self.businessController.updateBusinessType(context, successCallback, failureCallback);
  }; 
  PresentationController.prototype.createBusinessType = function(context) {
    var self = this;    
    self.showBusinessTypeLoadingScreen();
    function successCallback() {
      self.hideBusinessTypeLoadingScreen();
      self.showBusinessTypeToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),kony.i18n.getLocalizedString("i18n.frmBusinessTypes.message.createSuccessful"));
      self.getBusinessTypes();
    }
    function failureCallback(response) {
      self.hideBusinessTypeLoadingScreen();
      self.showBusinessTypeToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(response));
    }
    self.businessController.createBusinessType(context, successCallback, failureCallback);
  }; 
  PresentationController.prototype.getBusinessTypeGroups = function(context,action) {
    var self = this;    
    self.showBusinessTypeLoadingScreen();
    function successCallback(response) {
      self.hideBusinessTypeLoadingScreen();
      self.presentUserInterface("frmBusinessTypes", {"rolesForBusinessType" : response.groups,"action":action});
    }
    function failureCallback(response) {
      self.hideBusinessTypeLoadingScreen();
      self.showBusinessTypeToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(response));
    }
    self.businessController.getBusinessTypeGroups(context, successCallback, failureCallback);
  };
  PresentationController.prototype.showBusinessTypeLoadingScreen = function() {
    var self = this;
    self.presentUserInterface("frmBusinessTypes",{"loadingScreen":{"focus":true}});
  };
  PresentationController.prototype.hideBusinessTypeLoadingScreen = function() {
    var self = this;
    self.presentUserInterface("frmBusinessTypes",{"loadingScreen":{"focus":false}});
  };
  PresentationController.prototype.showBusinessTypeToastMessage = function(status,message) {
    var self = this;
    self.presentUserInterface("frmBusinessTypes",{"toastMessage":{"status":status,
                                                              "message":message}});
  };
  PresentationController.prototype.navigateToRequestsUI = function() {
    var self = this;
    self.getAllContractEnrollmentRequests();
  };
  PresentationController.prototype.getAllContractEnrollmentRequests = function () {
    var self = this;
    self.showRequestsLoadingScreen();
    var promiseGetCompanyRequests = Promisify(this.businessController, 'getListOfContractsByStatus');
    var promiseGetAutoApprovalStatus = Promisify(this.businessController, 'fetchBusinessConfigurations');
    // Promise.all([
    //   promiseGetCompanyRequests({"statusId":"SID_ORG_PENDING"}),
    //   promiseGetCompanyRequests({"statusId":"SID_ORG_REJECTED"}),
    //   promiseGetAutoApprovalStatus({})
    // ]).then(function (responses) {
    //   self.hideRequestsLoadingScreen();
    //   self.presentUserInterface("frmEnrollmentRequests", {"rejectedRequestsData" : responses[1].contract,"pendingRequestsData" : responses[0].contract, action:"ViewRequestsList","BusinessConfigurations":responses[2].BusinessConfigurationRecords} );
    // }).catch(function (res) {
    //   self.hideRequestsLoadingScreen();
    //   self.showRequestsToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(res));
    // });	

    Promise.all([
      promiseGetAutoApprovalStatus({})
    ]).then(function (responses) {
      self.hideRequestsLoadingScreen();
      self.presentUserInterface("frmEnrollmentRequests", {"rejectedRequestsData" :  [
        {
            "serviceType": "TYPE_ID_RETAIL",
            "servicedefinitionName": "Sole Proprietor (Retail Type)",
            "faxId": "abcd",
            "statusId": "SID_CONTRACT_ACTIVE",
            "name": "Kony Global201120",
            "id": "1606129095",
            "servicedefinitionId": "707dfea8-d0fe-4154-89c3-e7d7ef2ee16a",
            "createdts": "2020-11-20 11:16:29.0"
        },
        {
            "serviceType": "TYPE_ID_RETAIL",
            "servicedefinitionName": "Sole Proprietor (Retail Type)",
            "faxId": "abcd",
            "statusId": "SID_CONTRACT_ACTIVE",
            "name": "Kony Global20112001",
            "id": "2502836677",
            "servicedefinitionId": "707dfea8-d0fe-4154-89c3-e7d7ef2ee16a",
            "createdts": "2020-11-20 19:30:36.0"
        },
        {
            "serviceType": "TYPE_ID_RETAIL",
            "servicedefinitionName": "Sole Proprietor (Retail Type)",
            "faxId": "abcd",
            "statusId": "SID_CONTRACT_ACTIVE",
            "name": "Kony Global2011",
            "id": "6466843933",
            "servicedefinitionId": "707dfea8-d0fe-4154-89c3-e7d7ef2ee16a",
            "createdts": "2020-11-20 10:45:43.0"
        }
    ],"pendingRequestsData" :  [
      {
          "serviceType": "TYPE_ID_RETAIL",
          "servicedefinitionName": "Sole Proprietor (Retail Type)",
          "faxId": "abcd",
          "statusId": "SID_CONTRACT_ACTIVE",
          "name": "Kony Global201120",
          "id": "1606129095",
          "servicedefinitionId": "707dfea8-d0fe-4154-89c3-e7d7ef2ee16a",
          "createdts": "2020-11-20 11:16:29.0"
      },
      {
          "serviceType": "TYPE_ID_RETAIL",
          "servicedefinitionName": "Sole Proprietor (Retail Type)",
          "faxId": "abcd",
          "statusId": "SID_CONTRACT_ACTIVE",
          "name": "Kony Global20112001",
          "id": "2502836677",
          "servicedefinitionId": "707dfea8-d0fe-4154-89c3-e7d7ef2ee16a",
          "createdts": "2020-11-20 19:30:36.0"
      },
      {
          "serviceType": "TYPE_ID_RETAIL",
          "servicedefinitionName": "Sole Proprietor (Retail Type)",
          "faxId": "abcd",
          "statusId": "SID_CONTRACT_ACTIVE",
          "name": "Kony Global2011",
          "id": "6466843933",
          "servicedefinitionId": "707dfea8-d0fe-4154-89c3-e7d7ef2ee16a",
          "createdts": "2020-11-20 10:45:43.0"
      }
  ], action:"ViewRequestsList","BusinessConfigurations":responses[0].BusinessConfigurationRecords} );
    }).catch(function (res) {
      self.hideRequestsLoadingScreen();
      self.showRequestsToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(res));
    });	
  };
  PresentationController.prototype.getAllEnrollmentRequests = function (legalEntityData) {
    legalEntityName = legalEntityData[0].name;
    var self = this;
    self.showRequestsLoadingScreen();
    var promiseGetCompanyRequests = Promisify(this.businessController, 'getListOfContractsByStatus');
    var promiseGetAutoApprovalStatus = Promisify(this.businessController, 'fetchBusinessConfigurations');
    Promise.all([
      promiseGetCompanyRequests({"statusId":"SID_CONTRACT_PENDING",
                                 "legalEntityId":legalEntityData[0].id}),
      promiseGetCompanyRequests({"statusId":"SID_CONTRACT_REJECTED",
                                 "legalEntityId":legalEntityData[0].id}),
      promiseGetAutoApprovalStatus({})
    ]).then(function (responses) {
      self.hideRequestsLoadingScreen();
      self.presentUserInterface("frmEnrollmentRequests", {"rejectedRequestsData" : responses[1].contract,"pendingRequestsData" : responses[0].contract, action:"ViewRequestsList","BusinessConfigurations":responses[2].BusinessConfigurationRecords, "legalEntityName": legalEntityName, "legalEntityId":legalEntityData[0].id} );
    }).catch(function (res) {
      self.hideRequestsLoadingScreen();
      self.showRequestsToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(res));
    });	
  };
  PresentationController.prototype.getEnrolledCompanyDetails = function (context) {
    var self = this;
    self.showRequestsLoadingScreen();
    var promiseGetCompanyDetailsList = Promisify(this.businessController, 'getCompanyDetails');
    var promiseGetCompanyAccountsList = Promisify(this.businessController, 'getCompanyAccounts');
    var promiseFetchConfiguration = Promisify(this.businessController, 'getCoreTypeInformation');
    var promiseGetFeaturesActionsList = Promisify(this.businessController, 'getCompanyFeaturesActionsLimits');
    var promiseFetchFeature = Promisify(this.businessController, 'getAllFeatures');
    Promise.all([
      promiseGetCompanyDetailsList({"id":context.id}),
      promiseGetCompanyAccountsList({"Organization_id":context.id}),
      promiseGetFeaturesActionsList({"organization_id":context.id}),
      promiseFetchFeature(context),
      promiseFetchConfiguration({})
    ]).then(function (responses) {
      self.globalDetails.CompanyContext = responses[0].OrganisationDetails;
      self.globalDetails.OwnerContext = responses[0].OrganisationOwnerDetails; 
      self.globalDetails.accountContext = responses[1].OgranizationAccounts;
      self.globalDetails.featuresContext = responses[2].FeatureActions;
      self.isAccountCentricCore = responses[4].isAccountCentricCore;
      self.globalDetails.allfeatures = responses[3];
      context.features = responses[0];
      self.presentUserInterface("frmEnrollmentRequests",{"coreTypeConfig":responses[4]});
      self.hideRequestsLoadingScreen();
      self.presentUserInterface("frmEnrollmentRequests",{"action":"companyDetails",
                                                "companyDetails":self.globalDetails});
    }).catch(function (res) {
      self.hideRequestsLoadingScreen();
      kony.print("getEnrolledCompanyDetails(presentation controller): not able to fetch company details",res);
      self.showRequestsToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(res));
    });	
  };
  PresentationController.prototype.getEnrolledContractDetails = function (context) {
    var self = this;
    self.showRequestsLoadingScreen();
    var promiseGetContractDetailsList = Promisify(this.businessController, 'getContractDetails');
    var promiseFetchConfiguration = Promisify(this.businessController, 'getCoreTypeInformation');
    var promiseGetInfinityUsersList = Promisify(this.businessController, 'getContractInfinityUsers');

    Promise.all([
      promiseGetContractDetailsList({
        "contractId": context.id,
        "legalEntityId": context.legalEntityId
      }),
      promiseGetInfinityUsersList({
        "contractId": context.id,
        "legalEntityId": context.legalEntityId
      }),
      promiseFetchConfiguration({})
    ]).then(function (responses) {
      self.globalDetails.CompanyContext = responses[0];
      self.globalDetails.OwnerContext = responses[1];
      self.globalDetails.accountContext = responses[0].contractCustomers;
      self.hideRequestsLoadingScreen();
      self.presentUserInterface("frmEnrollmentRequests",{"action":"companyDetails",
                                                         "companyDetails":self.globalDetails});
    }).catch(function (res) {
      self.hideRequestsLoadingScreen();
      kony.print("getEnrolledCompanyDetails(presentation controller): not able to fetch company details",res);
      self.showRequestsToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(res));
    });
  };
  PresentationController.prototype.setLegalEntityData = function(data) {
       this.legalEntityData = data;
    },
    PresentationController.prototype.getLegalEntityData = function() {
      return this.legalEntityData;
    },
  PresentationController.prototype.updateContractStatus = function(command) {
    var self = this;
    var context={};
    var message="";
    self.showRequestsLoadingScreen();
    function successCallback(response) {
      self.hideRequestsLoadingScreen();
      self.showRequestsToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),message);
      var data=self.getLegalEntityData();
      self.getAllEnrollmentRequests(data);
    }
    function failureCallback(error) {
      self.hideRequestsLoadingScreen();
      self.showRequestsToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    if(command.statusId==="SID_CONTRACT_REJECTED"){
      context={
        "contractId":command.contractId,
        "statusId":"SID_CONTRACT_REJECTED",
        "rejectedReason":command.rejectedReason,
        "rejectedBy":command.rejectedBy
      };
      message=command.companyName+" Company request is rejected successfully";
      self.businessController.updateContractStatus(context, successCallback, failureCallback);
    }else{
      context={
        "contractId":command.contractId,
        "statusId": "SID_CONTRACT_ACTIVE"
      };
      message=command.companyName+" Company request is approved successfully";
      self.businessController.updateContractStatus(context, successCallback, failureCallback);
    }
  };
  PresentationController.prototype.showRequestsLoadingScreen = function() {
    var self = this;
    self.presentUserInterface("frmEnrollmentRequests",{"loadingScreen":{"focus":true}});
  };
  PresentationController.prototype.hideRequestsLoadingScreen = function() {
    var self = this;
    self.presentUserInterface("frmEnrollmentRequests",{"loadingScreen":{"focus":false}});
  };
  PresentationController.prototype.showRequestsToastMessage = function(status,message) {
    var self = this;
    self.presentUserInterface("frmEnrollmentRequests",{"toastMessage":{"status":status,
                                                              "message":message,"name":legalEntityName?legalEntityName:""}}, );
  };
  // create contract related functions
  
  PresentationController.prototype.searchCoreCustomers = function(payload,formName) {
    var self = this; 
    var coreSearchData=[];
    function onSuccess(response) {
      self.hideLoadingScreen(formName);
      coreSearchData = response.customers || [];
      self.presentContractScreen({"coreCustomerSearch":coreSearchData}, formName);
    }
    function onError(error) {
      self.hideLoadingScreen(formName);
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error), formName);
    }
    this.showLoadingScreen(formName);
    this.businessController.searchCoreCustomers(payload, onSuccess, onError);
  };
  PresentationController.prototype.getRelatedCoreCustomers = function(payload, formName) {
    var self = this; 
    var coreRelatedCustomers=[];
    function onSuccess(response) {
      self.hideLoadingScreen(formName);
      coreRelatedCustomers = response.customers;
      self.presentContractScreen({"coreRelatedCustomers":coreRelatedCustomers,"coreCustomerId" : payload.coreCustomerId}, formName);
    }

    function onError(error) {
      self.hideLoadingScreen(formName);
      self.presentContractScreen({"coreRelatedCustomers":[],"coreCustomerId" : payload.coreCustomerId}, formName);
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error), formName);
    }
    this.showLoadingScreen(formName);
    this.businessController.getCoreRelativeCustomers(payload, onSuccess, onError);
  };
  PresentationController.prototype.getSearchContract = function(payload, formName) {
    var self = this;
    var coreRelatedCustomers = [];

    function onSuccess(response) {
      
        self.hideLoadingScreen(formName);
        self.presentContractSearchScreen({
            "searchData": response
        });
    }

    function onError(error) {
        self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(error), formName);
        self.hideLoadingScreen(formName);
    }
    this.showLoadingScreen(formName);
    this.businessController.getSearchContract(payload, onSuccess, onError);
};

  PresentationController.prototype.fetchServiceDefinitions = function(payload) {
    var self = this; 
    var serviceDefinitions=[];
    function onSuccess(response) {
      serviceDefinitions = response.ServiceDefinitionRecords;
      self.hideLoadingScreen();
      self.presentContractScreen({"serviceDefinitions":serviceDefinitions});
    }

    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
      self.hideLoadingScreen();
      
    }
    this.showLoadingScreen();
    this.businessController.getServiceDefinition(payload, onSuccess, onError);
  };
  PresentationController.prototype.getLegalEntities = function(payload,formName){
    var self=this;
    self.showLoadingScreen(formName);
    var userLegalArr = LegalEntityPermissionExtn.getCurrentUserLEArr();
    
    self.hideLoadingScreen(formName);
    var companyLegalUnits = userLegalArr?userLegalArr:[];
    self.presentContractScreen({"companyLegalUnits":companyLegalUnits}, formName);
  };
  PresentationController.prototype.getServiceDefinitionsForContracts = function(payload,option,formName) {
    var self = this; 
    var serviceDefinitions=[];
    function onSuccess(response) {
      self.alreadyContractsCalled = response.ServiceDefinitionRecords;
      serviceDefinitions = response.ServiceDefinitionRecords;
      if(option === 1 || option === "CREATE"){ //hide loading screen only incase of search screen
        self.hideLoadingScreen(formName);
      }
      self.presentContractScreen({"serviceDefinitions":serviceDefinitions,"option":option}, formName);

    }
    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error), formName);
      self.hideLoadingScreen(formName);
      
    }
    this.showLoadingScreen(formName);
    //this.businessController.getServiceDefinitionsForContracts(payload, onSuccess, onError);
    if(self.alreadyContractsCalled.length === 0 || option === "CREATE" || option === 1){
      this.businessController.getServiceDefinitionsForContracts(payload, onSuccess, onError);
    }else{
      var serDefRec = {"ServiceDefinitionRecords":self.alreadyContractsCalled};
      onSuccess(serDefRec);
    }
  };
  PresentationController.prototype.getCoreCustomerAccounts = function(payload, formName) {
    var self = this; 
    var coreCustomerAccounts=[];
    function onSuccess(response) {
      coreCustomerAccounts = response.coreCustomerAccounts;
      self.hideLoadingScreen(formName);
      self.presentContractScreen({"coreCustomerAccounts":coreCustomerAccounts}, formName);
    }

    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error), formName);
      self.hideLoadingScreen(formName);
    }
    this.showLoadingScreen(formName);
    this.businessController.getCoreCustomerAccounts(payload, onSuccess, onError);
  };
  PresentationController.prototype.getServiceDefinitionActionLimit = function(payload) {
    var self = this; 
    var serviceDefinitionFeatures=[];
    function onSuccess(response) {
      serviceDefinitionFeatures = response.features;
      self.hideLoadingScreen();
      self.presentContractScreen({"serviceDefinitionFeatures":serviceDefinitionFeatures});
    }

    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
      self.hideLoadingScreen();
    }
    this.showLoadingScreen();
    this.businessController.getFeaturesAndActions(payload, onSuccess, onError);
  };
  PresentationController.prototype.getServiceDefinitionFeaturesAndLimits = function(payload, formName) {
    var self = this; 
    var serviceDefinitionFeatures=[];
    function onSuccess(response) {
      serviceDefinitionFeatures = response;
      self.hideLoadingScreen(formName);
      self.presentContractScreen({"serviceDefinitionFeaturesLimits":serviceDefinitionFeatures}, formName);
    }

    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error), formName);
      self.hideLoadingScreen(formName);
    }
    this.showLoadingScreen(formName);
    this.businessController.getServiceDefinitionFeaturesAndLimits(payload, onSuccess, onError);
  };
  PresentationController.prototype.getServiceDefinitionMonetaryActions = function(payload, formName) {
    var self = this; 
    var serviceDefinitionFeatures=[];
    function onSuccess(response) {
      serviceDefinitionFeatures = response;
      //self.hideLoadingScreen();
      self.presentContractScreen({"serviceDefinitionMonetaryActions":serviceDefinitionFeatures}, formName);
    }

    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error), formName);
      self.hideLoadingScreen(formName);
    }
    this.showLoadingScreen(formName);
    this.businessController.getServiceDefinitionMonetaryActions(payload, onSuccess, onError);
  };
   /*
+  * fetch core customer accounts, service def feature and limits in create contract flow
+  * @param: {"accountsPayload:{},"featuresPayload":{}}
+  */
  PresentationController.prototype.fetchAccountsSDFeaturesLimits = function(inputParams, formName){
    var self =this;
    self.showLoadingScreen(formName);
    var promiseGetCoreCustAcc = Promisify(this.businessController, 'getCoreCustomerAccounts');
    var promiseGetSDFeatureLimits = Promisify(this.businessController, 'getServiceDefinitionFeaturesAndLimits');
    Promise.all([
      promiseGetCoreCustAcc(inputParams.accountsPayload),
      promiseGetSDFeatureLimits(inputParams.featuresPayload)
    ]).then(function(responses) {
      self.presentContractScreen({"coreCustomerAccounts":responses[0].coreCustomerAccounts ? responses[0].coreCustomerAccounts : []}, formName);
      self.presentContractScreen({"serviceDefinitionFeaturesLimits":responses[1] ? responses[1]: []}, formName);
//       self.hideLoadingScreen(formName);

    }).catch(function(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error), formName);
      self.hideLoadingScreen(formName);
    });
  };
  /*
 * fetch core customer accounts, contract feature and limits in edit contract flow
  * @param: {"accountsPayload:{},"featuresPayload":{}}
  */
  PresentationController.prototype.fetchAccountsContractFeaturesLimits = function(inputParams, formName){
    var self =this;
    self.showLoadingScreen(formName);
    var promiseGetCoreCustAcc = Promisify(this.businessController, 'getCoreCustomerAccounts');
    var promiseGetContractFeatureLimits = Promisify(this.businessController, 'getContractFeatureActionLimits');
    var promiseRequest =[];
    if(inputParams.accountsPayload) promiseRequest.push(promiseGetCoreCustAcc(inputParams.accountsPayload));
    if(inputParams.featuresPayload) 
      promiseRequest.push(promiseGetContractFeatureLimits({"contractId": inputParams.featuresPayload.id,"legalEntityId":inputParams.featuresPayload.legalEntityId}));
    Promise.all(promiseRequest).then(function(responses) {
      var custAccResponse = [],featuresResponse =[];
      if(inputParams.accountsPayload){
        custAccResponse = responses[0].coreCustomerAccounts ? responses[0].coreCustomerAccounts : [];
        self.presentContractScreen({"coreCustomerAccounts": custAccResponse}, formName);
      }
      if(inputParams.featuresPayload){
       featuresResponse = promiseRequest.length > 1 ? responses[1] : responses[0];
        self.globalDetails["accountsFeatures"] = featuresResponse;
        self.presentContractScreen({
          "action": "contractFeatureActionLimits",
          "contractDetails": self.globalDetails,
          'selectTab' : inputParams.featuresPayload.action
        }, formName);
      }
      self.hideLoadingScreen(formName);

    }).catch(function(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error), formName);
      self.hideLoadingScreen(formName);
    });
  };
  PresentationController.prototype.getCoreRelativeCustomers = function(payload) {
    var self = this; 
    var coreRelatedCustomers=[];
    function onSuccess(response) {
      coreRelatedCustomers = response.customers ? response.customers :[];
      if(coreRelatedCustomers.length > 0)
        self.presentContractScreen({"coreRelativeCustomers":coreRelatedCustomers});
      else
        self.presentContractScreen({"coreRelativeCustomersError":[]});
    }
    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
      self.presentContractScreen({"coreRelativeCustomersError":[]});
    }
    this.businessController.getCoreRelativeCustomers(payload, onSuccess, onError);
  };
  PresentationController.prototype.createContract = function (context, formName) {
    var self = this; 
    var payload={};
    payload.contractName= context.contractName;
    payload.serviceDefinitionName= context.serviceDefinitionName;
    payload.serviceDefinitionId= context.serviceDefinitionId;
    payload.faxId= context.faxId;
    payload.communication=JSON.stringify(context.communication);
    payload.address=JSON.stringify(context.address);
    payload.legalEntityId=context.legalEntityId;
    payload.contractCustomers=JSON.stringify(context.contractCustomers);
    payload.accountLevelPermissions1=JSON.stringify(context.accountLevelPermissions);
    payload.globalLevelPermissions1=JSON.stringify(context.globalLevelPermissions);
    payload.transactionLimits1=JSON.stringify(context.transactionLimits);    
    function completionCreateContractCallback(response) {
	     if(response['status'] === "Failure"){
      self.hideLoadingScreen(formName);
      self.presentContractSearchScreen({
        "createContractError":{"error":ErrorInterceptor.errorMessage(response)}
      });
      }else{
        self.getContractInformation(response.contractId,context.legalEntityId,formName,"CREATE_SUCCESS");
      }
    }

    function onError(error) {
      self.hideLoadingScreen(formName);
      self.presentContractSearchScreen({
        "createContractError":{"error":ErrorInterceptor.errorMessage(error)}
      });

    }
    this.showLoadingScreen(formName);
    this.businessController.createContract(payload, completionCreateContractCallback, onError);
  };
  PresentationController.prototype.editContract = function (context, formName) {
    var self = this; 
    var payload={};
    payload.contractId=context.contractId;
    payload.contractName= context.contractName;
    payload.serviceDefinitionName= context.serviceDefinitionName;
    payload.serviceDefinitionId= context.serviceDefinitionId;
    payload.faxId= context.faxId;
    payload.communication=JSON.stringify(context.communication);
    payload.address=JSON.stringify(context.address);
    payload.legalEntityId=context.legalEntityId;
    payload.contractCustomers=JSON.stringify(context.contractCustomers);
    payload.accountLevelPermissions1=JSON.stringify(context.accountLevelPermissions);
    payload.globalLevelPermissions1=JSON.stringify(context.globalLevelPermissions);
    payload.transactionLimits1=JSON.stringify(context.transactionLimits);
    payload.deletedCustomers = JSON.stringify(context.deletedCustomers);
    function completionCreateContractCallback(response) {
	if(response['status'] === "Failure"){
       self.showCompaniesForm({"action":"editCancel"});
       self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(response));
       self.hideLoadingScreen();
      }else{
       self.cacheDataFlag.fetchUpdatedFeatures = true;
       //self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),"Contract has been updated successfully","frmCompanies");
       self.getContractInformation(context.contractId,context.legalEntityId,formName,"EDIT_SUCCESS");
      }
    }
    function onError(error) {
      self.showCompaniesForm({"action":"editCancel"});
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
      self.hideLoadingScreen();
    }
    this.showLoadingScreen(formName);
    this.businessController.editContract(payload, completionCreateContractCallback, onError);
  };
  PresentationController.prototype.getCustomerStatusList = function(payload,formName) {
    var self = this; 
    var customerStatusList=[];
    function onSuccess(response) {
      customerStatusList = response.Configuration ;
      self.presentContractScreen({"customerStatusList":customerStatusList}, formName);
    }
    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error), formName);
    }
    this.businessController.getConfigurations(payload, onSuccess, onError);
  };
  PresentationController.prototype.getAllEligibleRelationalCustomers = function(payload) {
    var self = this; 
    var coreRelatedCustomers=[];
    function onSuccess(response) {
      coreRelatedCustomers = response.customers ? response.customers :[];
      if(coreRelatedCustomers.length > 0)
        self.presentContractScreen({"AllEligibleRelationalCustomers":coreRelatedCustomers});
      else
        self.presentContractScreen({"AllEligibleRelationalCustomersError":[]});
    }
    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
      self.presentContractScreen({"AllEligibleRelationalCustomersError":[]});
    }
    this.businessController.getAllEligibleRelationalCustomers(payload, onSuccess, onError);
  };
  PresentationController.prototype.customerSearch = function(payload,toCheck) {
    var self = this; 
    function onSuccess(response) {
      if (response.records.length > 0)  {
        //self.presentContractScreen({"customerSearch":response.records}); 
        if((response.hasOwnProperty("customerbasicinfo_view")&& (toCheck!=1))) {
          self.isEmailSearch = false;
          self.customerSearchRecords = response.records;
          self.CustomerBasicInforObj = response.customerbasicinfo_view;         
          self.getCustomerContact(payload._legalEntityId);          
        } else {
          self.isEmailSearch = true;
          self.CustomerContactNumListData = [];
          self.CustomerEmailIdsListData = [];
         // var legalEntity=response.customerbasicinfo_view.legalEntityId
          self.presentContractScreen({"customerSearch":response.records,toCheck});
        }
      }
      else
        self.presentContractScreen({"AllEligibleRelationalCustomersError":[toCheck]});
    }
    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
      self.presentContractScreen({"AllEligibleRelationalCustomersError":[toCheck]});
    }
    this.businessController.customerSearch(payload, onSuccess, onError);
  };
  PresentationController.prototype.getServiceDefinitionRoles = function(payload) {
    var self = this; 
    self.showLoadingScreen();
    function onSuccess(response) {
      self.presentContractScreen({"serviceDefRoles":response.roles});
      self.hideLoadingScreen();
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.getServiceDefinitionRoles(payload, onSuccess, onError);
  };
  /*
   * @name fetchContractServiceDefRoleDataForUser - fetchs data for user accounts,features,limits
   * @member CompaniesModule.presentationController
   * @params:  inputParams -{"coreCustomerId":"",contractId":"","coreCustomerRoleIdList":[{"coreCustomerId":"","serviceDefinitionId":"","roleId":""},"serviceDefinitionId":"","roleId":""]}
   */
  PresentationController.prototype.fetchContractServiceDefRoleDataForUser = function (inputParams) {
    var self = this;
    self.showLoadingScreen();  
    var accInputParam = {"contractId":inputParams.contractId, "legalEntityId":inputParams.legalEntityId };
    var coreCustomerAccounts=[];
    
    function onSuccess(response) {
      var filterFormatObj = filterFormatAccounts(response);
      self.getCoreCustomerRoleFeatureActionLimits(inputParams,filterFormatObj.accounts,filterFormatObj.productsList);
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));

    }
    //fetch product related data to fetch features
    function filterFormatAccounts(response){
      try{
        var custId = inputParams.coreCustomerId;
        var filteredAccList =[], products =[];
        var accounts = response.contractAccounts.length > 0 ? response.contractAccounts : [];
        filteredAccList = accounts.filter(function(rec){
          if(rec.coreCustomerId === custId){
            return rec;
          }
        });
        products = filteredAccList.reduce(function(prodArr,currRec){
          if(!prodArr.includes(currRec.productId)){
            prodArr.push({"accountId":currRec.accountNumber || currRec.accountId,
                          "productId":currRec.productId || "",
                          "arrangementRoleId":currRec.ownerType || ""});
          }
          return prodArr;
        },[]);
        return {"accounts":filteredAccList, "productsList":products};
      } catch(err){
        onError(err);
      }
    }
    self.businessController.getContractAccounts(accInputParam, onSuccess, onError);
  };
  /*
   * @name formatFeaturesPerAccount - assign features for all available accounts
   * @member CompaniesModule.presentationController
   */
  PresentationController.prototype.formatFeaturesPerAccount = function(accLvlFeatures){
     var featuresPerAccObj = {};
     var featuresAccountsArr = accLvlFeatures.accountLevelPermissions.length > 0 ? accLvlFeatures.accountLevelPermissions[0].accounts : [];
     for(let i=0; i<featuresAccountsArr.length; i++){
       if(featuresAccountsArr[i].accountId)
         featuresPerAccObj[featuresAccountsArr[i].accountId] = featuresAccountsArr[i].features || [];
     }
     return featuresPerAccObj;
   };
   /*
   * @name getCoreCustomerRoleFeatureActionLimits
   * @member CompaniesModule.presentationController
   * @param inputParams -{"coreCustomerId":"",contractId":"","coreCustomerRoleIdList":[{"coreCustomerId":"","serviceDefinitionId":"","roleId":""},"serviceDefinitionId":"","roleId":""]}
   */
  PresentationController.prototype.getCoreCustomerRoleFeatureActionLimits = function(inputParams,coreCustomerAccounts,productsList) {
    var self = this; 
    var productsServiceInput = [];
    var custIdRoleSerDefObj = (JSON.parse(inputParams.coreCustomerRoleIdList))[0];
    custIdRoleSerDefObj["productsList"] = productsList;
    productsServiceInput.push(custIdRoleSerDefObj);
    self.showLoadingScreen();    
    self.globalDetails = { };
    var promiseFetchProductFeatures = Promisify(this.businessController, 'getCoreCustomerProductRolesFeatureActionLimits');
	var promiseGetContractList = Promisify(this.businessController, 'getCoreCustomerRoleFeatureActionLimits');
	var promiseGetSignatoryList = Promisify(this.businessController,'getAllSignatoryGroupsbyCoreCustomerIds');
	Promise.all([
      promiseFetchProductFeatures({"coreCustomerRoleIdList": JSON.stringify(productsServiceInput),"legalEntityId":inputParams.legalEntityId,"contractId":inputParams.contractId}),
      promiseGetContractList({"coreCustomerRoleIdList": inputParams.coreCustomerRoleIdList, "legalEntityId":inputParams.legalEntityId}),
      promiseGetSignatoryList({"coreCustomerIds":[inputParams.coreCustomerId]}),
    ]).then(function (response){
     // response[2] ={};
      var featuresPerAcc = self.formatFeaturesPerAccount(response[0]);
      self.presentContractScreen({"serviceDefinitionRoles":response,"featuresPerAccount":featuresPerAcc});
      self.hideLoadingScreen();
    }).catch(function (res) {
    //function onError(error) {
      self.hideLoadingScreen();
   //   self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    });
   //this.businessController.getCoreCustomerRoleFeatureActionLimits(payload, onSuccess, onError);
  };
      
     
      
  /*
   * @name setAccountsFeaturesForEnrollCust
   * @member CustomerManagementModule.presentationController
   */
  PresentationController.prototype.setAccountsFeaturesForAddUser = function (custId,accountsFeaturesObj) {
    var custAccFeaturesObj = {"accounts" : accountsFeaturesObj.accounts,
                              "features" : accountsFeaturesObj.features,
                              "accLevelFeatures":accountsFeaturesObj.accLevelFeatures,
                              "nonAccLevelFeatures": accountsFeaturesObj.nonAccLevelFeatures,
                              "accountMapFeatures": accountsFeaturesObj.accountMapFeatures,
                              "accLevelLimits" : accountsFeaturesObj.accLevelLimits,
                              "limitGroups" : accountsFeaturesObj.limitGroups,
                              "signatoryGroups":accountsFeaturesObj.signatoryGroups,
                              "customerDetails" : accountsFeaturesObj.isPrimary === true ?this.CustomerBasicInfo.customer : null,
                              "isPrimary" : accountsFeaturesObj.isPrimary};
    this.AddUserAccountsFeatures[custId] = custAccFeaturesObj;
  };
  /*
   * @name deleteAccountsFeaturesForEnrollCust
   * @member CustomerManagementModule.presentationController
   */
  PresentationController.prototype.deleteAccountsFeaturesForAddUser = function(custId){
    if(this.AddUserAccountsFeatures[custId])
      delete this.AddUserAccountsFeatures[custId];
  };
  /*
   * @name getAccountsFeaturesForEnrollCust
   * @member CustomerManagementModule.presentationController
   * @param: customer id
   */
  PresentationController.prototype.getAccountsFeaturesForAddUser = function (custId) {
    if(custId){
      return this.AddUserAccountsFeatures[custId];
    } else{
      return this.AddUserAccountsFeatures;
    }
  };
  
  PresentationController.prototype.createInfinityUser = function(context){
    var self = this; 
    self.showLoadingScreen();
    function onSuccess(response) {
      self.presentContractScreen({"createInfinityUser":response});
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),"Infinity User Created Successfully");
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.createInfinityUser(context, onSuccess, onError);
  };
  PresentationController.prototype.editInfinityUser = function(context){
    var self = this; 
    self.showLoadingScreen();
    function onSuccess(response) {
      self.presentContractScreen({"editInfinityUser":response});
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),"Infinity User Created Successfully");
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.editInfinityUser(context, onSuccess, onError);
  };
  PresentationController.prototype.getContractUser = function(){
     return this.globalDetails.signatoryUsers;
   };
  PresentationController.prototype.getAutoSyncAccountsFlag = function(payload) {
    var self = this; 
    function onSuccess(response) {
      self.presentContractScreen({"autoSyncAccountsFlag":response.Configuration});
    }
    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.getConfigurations(payload, onSuccess, onError);
  };
  
  PresentationController.prototype.updateSignatoryGroups = function(payload) {
    var self = this; 
    self.showLoadingScreen();
    function onSuccess(response) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),kony.i18n.getLocalizedString("i18n.frmCompaniesController.deleteViewSignatoryGroup.successToastMessage"));
      self.getSignatoryGroupDetails({"signatoryGroupId":response.signatoryGroupId },false);        
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.updateSignatoryGroups(payload, onSuccess, onError);
  };

  PresentationController.prototype.updateSignatoryGroupDetails = function(payload,isView) {
    var self = this; 
    self.showLoadingScreen();
    function onSuccess(response) {
      self.presentUserInterface("frmCompanies",{
         "createGroupSuccess":{"contractId":payload.contractId,"message":"Signatory Group has been updated successfully","isView":isView,"signGroupId":payload.signatoryGroupId}
       });
      
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.updateSignatoryGroups(payload, onSuccess, onError);
  };

  
  PresentationController.prototype.isSignatoryGroupEligibleForDelete = function(payload, isView) {
    var self = this; 
    var inputReq ={"signatoryGroupId":payload.signatoryGroupId,
                   "signatoryGroupName":payload.signatoryGroupName
                  };
    self.showLoadingScreen();
    function onSuccess(response) {     
      self.presentContractScreen({"isElegibleForDelete":response.status,
                                   "signatoryGroupName":inputReq.signatoryGroupName,
                                   "signatoryGroupId":inputReq.signatoryGroupId,
                                   "isViewScreen":isView
                                  });
      self.hideLoadingScreen();
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.isSignatoryGroupEligibleForDelete(inputReq, onSuccess, onError);
  };  
   
  PresentationController.prototype.deleteSignatoryGroup = function(payload) {
    var self = this; 
    var inpuReq={"signatoryGroupName":payload.signatoryGroupName};
    var inputRequest = {"contractId":payload.contractId,
                       "signatoryGroupId":payload.signatoryGroupId};
    self.showLoadingScreen();
    function onSuccess(response) {
        self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"), "Signatory Group "+inpuReq.signatoryGroupName+" has been deleted successfully.");
       self.getAllSignatoryGroups({"contractId":payload.contractId});
     //  self.showToastMessage("Signatory Group "+inpuReq.signatoryGroupName+" has been deleted successfully.");
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.deleteSignatoryGroup(inputRequest, onSuccess, onError);
  };
  
  PresentationController.prototype.getAllSignatoryGroups = function(payload,tabOption) {
    var self = this; 
    self.showLoadingScreen();
    function onSuccess(response) {
      self.presentContractScreen({"signatoryGroups":response,"tab":tabOption || ""});
      self.hideLoadingScreen();
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.getAllSignatoryGroups(payload, onSuccess, onError);
  };
  PresentationController.prototype.getSignatoryGroupDetails = function(payload,isEdit) {
    var self = this; 
    self.showLoadingScreen();
    function onSuccess(response) {
      self.presentContractScreen({"signatoryGroupDetails":response,"isEdit":isEdit});
      self.hideLoadingScreen();
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(error));
    }
    this.businessController.getSignatoryGroupDetails(payload, onSuccess, onError);
  };
  PresentationController.prototype.getNoGroupUsers = function(payload) {
    var self = this; 
    self.showLoadingScreen();
    function onSuccess(response) {
      self.presentContractScreen({"noGroupUsers":response.EligibleSignatories});
      self.hideLoadingScreen();
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.getNoGroupUsers(payload, onSuccess, onError);
  };
  PresentationController.prototype.getApprovalPermissionsForUser = function(payload) {
    var self = this; 
    self.showLoadingScreen();
    function onSuccess(response) {
      self.presentContractScreen({"approvalPermissions":response});
      self.hideLoadingScreen();
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.getApprovalPermissionsForUser(payload, onSuccess, onError);
  };
  PresentationController.prototype.createSignatoryGroup = function(payload) {
    var self = this; 
    self.showLoadingScreen();
    function onSuccess(response) {
      self.presentUserInterface("frmCompanies",{
         "createGroupSuccess":{"contractId":payload.contractId,"message":"Signatory Group has been created successfully","isView":false}
       });
      self.hideLoadingScreen();
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.createSignatoryGroup(payload, onSuccess, onError);
  };
  
  
     PresentationController.prototype.UserIdSearchOperationDetailedData = function(payload) {
    var self = this; 
  // self.showLoadingScreen();
    function onSuccess(response) {
      self.presentContractScreen({"customerSearchByuserId":response});
      self.hideLoadingScreen();
    }
    function onError(error) {
      self.hideLoadingScreen();
     self.presentContractScreen({"customerSearchByuserIdError":error});
    // self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.UserIdSearchOperationDetailedData(payload, onSuccess, onError);
  };
         /****** APPROVAL MATRIX *****/
  /*
   * @name getApprovalMatrix
   * @member CompaniesModule.presentationController
   * @param: {"contractId": "","cif":""}, isAccount level(true/false)
   */
  PresentationController.prototype.getApprovalMatrixByCif = function(payload, isAccountLevel,featureCardId,isSGReq) {
    var self = this; 
    self.showLoadingScreen();
    function onSuccess(response) {
      if(isSGReq && isSGReq === true){
        self.getAllSignatoryGroups({"contractId": payload.contractId},2);
      } 
      self.presentContractScreen({"approvalMatrixOfCif":response,
                                   "isAccountLevel":isAccountLevel,
                                   "featureCardId":featureCardId});
      if(isSGReq === undefined)
        self.hideLoadingScreen();
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.getApprovalMatrix(payload, onSuccess, onError);
  };
  /*
   * @name getApprovalMatrixByContractId
   * @member CompaniesModule.presentationController
   * @param: {"contractId": ""}, is signatory group call required(true/false)
   */
  PresentationController.prototype.getApprovalMatrixByContractId = function(payload,isSGReq) {
    var self = this; 
    self.showLoadingScreen();
    function onSuccess(response) {
      if(isSGReq === true)
        self.getAllSignatoryGroups(payload,2);
      self.presentContractScreen({"action":"contractApprovalMatrix",
                                   "approvalMatrix":response});
      //self.hideLoadingScreen();
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.getApprovalMatrixByContractId(payload, onSuccess, onError);
  };
  /*
   * @name getApprovalRules
   * @member CompaniesModule.presentationController
   * @param: {"contractId":"","cifId": "","accountId": "","featureId": "","actionId":"","limitTypeId": ""}
   */
  PresentationController.prototype.getApprovalRules = function(payload) {
    var self = this; 
    self.showLoadingScreen();
    function onSuccess(response) {
      self.presentContractScreen();
      self.hideLoadingScreen();
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.getApprovalRules(payload, onSuccess, onError);
  };
  /*
   * @name getApproversInSignatoryGroup
   * @member CompaniesModule.presentationController
   * @param: {"signatoryGroupId":""}
   */
  PresentationController.prototype.getApproversInSignatoryGroup = function(payload) {
    var self = this;
    self.showLoadingScreen();
    function onSuccess(response) {
      self.presentContractScreen();
      self.hideLoadingScreen();
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.getApproversInSignatoryGroup(payload, onSuccess, onError);
  };
  /*
   * @name createApprovalRuleUserLevel
   * @member CompaniesModule.presentationController
   * @param: create payload
   */
  PresentationController.prototype.createApprovalRuleUserLevel = function(payload, actionName,featureCardId) {
    var self = this;
    self.showLoadingScreen();
    var reqParam ={
      "contractId": payload.contractId,
      "cif": payload.cif
    };
    var isAccountLevel = payload.accountId ? true : false;
    function onSuccess(response) {
      var successMsg = kony.i18n.getLocalizedString("i18n.frmCompanies.ApprovalRulesForAction") + "\"" +actionName+
          "\"" + kony.i18n.getLocalizedString("i18n.frmCompanies.haveBeenAddedSuccessfully");
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),successMsg);
      self.getApprovalMatrixByCif(reqParam, isAccountLevel,featureCardId);
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.createApprovalRuleUserLevel(payload, onSuccess, onError);
  };
  /*
   * @name createApprovalRuleSGLevel
   * @member CompaniesModule.presentationController
   * @param: create payload, selected action name, current feature card widgetId
   */
  PresentationController.prototype.createApprovalRuleSGLevel = function(payload, actionName, featureCardId) {
    var self = this;
    var reqParam ={
      "contractId": payload.contractId,
      "cif": payload.cif
    };
    var isAccountLevel = payload.accountId ? true : false;
    self.showLoadingScreen();
    function onSuccess(response) {
      var successMsg = kony.i18n.getLocalizedString("i18n.frmCompanies.ApprovalRulesForAction") + "\"" +actionName+
          "\"" + kony.i18n.getLocalizedString("i18n.frmCompanies.haveBeenAddedSuccessfully");
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),successMsg);
      self.getApprovalMatrixByCif(reqParam, isAccountLevel,featureCardId);
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.createApprovalRuleSGLevel(payload, onSuccess, onError);
  };
  /*
   * @name updateApprovalRuleUserLevel
   * @member CompaniesModule.presentationController
   * @param: update payload
   */
PresentationController.prototype.updateApprovalRuleUserLevel = function(payload, actionName, isDelete,featureCardId) {
    var self = this;
    self.showLoadingScreen();
    var reqParam ={
      "contractId": payload.contractId,
      "cif": payload.cif
    };
    var isAccountLevel = payload.accountId ? true : false;
    function onSuccess(response) {
      var msg = isDelete === false ? kony.i18n.getLocalizedString("i18n.frmCompanies.haveBeenUpdatedSuccessfully"): kony.i18n.getLocalizedString("i18n.frmCompanies.deletedSuccessfully");
      var successMsg = kony.i18n.getLocalizedString("i18n.frmCompanies.ApprovalRulesForAction") + "\"" +actionName+
          "\"" + msg;
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),successMsg);
      self.getApprovalMatrixByCif(reqParam, isAccountLevel,featureCardId);
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.updateApprovalRuleUserLevel(payload, onSuccess, onError);
  };
  /*
   * @name updateApprovalRuleSGLevel
   * @member CompaniesModule.presentationController
   * @param: update payload, selected action name, is delete action
   */
  PresentationController.prototype.updateApprovalRuleSGLevel = function(payload, actionName, isDelete,featureCardId) {
    var self = this; 
    var reqParam ={
      "contractId": payload.contractId,
      "cif": payload.cif
    };
    var isAccountLevel = payload.accountId ? true : false;
    self.showLoadingScreen();
    function onSuccess(response) {
      var msg = isDelete === false ? kony.i18n.getLocalizedString("i18n.frmCompanies.haveBeenUpdatedSuccessfully"): kony.i18n.getLocalizedString("i18n.frmCompanies.deletedSuccessfully");
      var successMsg = kony.i18n.getLocalizedString("i18n.frmCompanies.ApprovalRulesForAction") + "\"" +actionName+
          "\"" + msg;
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),successMsg);
      self.getApprovalMatrixByCif(reqParam, isAccountLevel, featureCardId);
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.updateApprovalRuleSGLevel(payload, onSuccess, onError);
  };
  /*
   * @name updateApprovalMode
   * @member CompaniesModule.presentationController
   * @param: {"coreCustomerId": "","contractId": "","isGroupLevel":"1"}
   */
  PresentationController.prototype.updateApprovalMode = function(payload) {
    var self = this; 
    var reqParam ={
      "contractId": payload.contractId,
      "cif":payload.coreCustomerId
    };
    self.showLoadingScreen();
    function onSuccess(response) {
      self.getApprovalMatrixByCif(reqParam, false, null);
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.updateApprovalMode(payload, onSuccess, onError);
  };
  /*
   * @name isApprovalMatrixDisabled
   * @member CompaniesModule.presentationController
   * @param: {"contractId": "","cif": "",}
   */
  PresentationController.prototype.isApprovalMatrixDisabled = function(payload) {
    var self = this; 
    self.showLoadingScreen();
    function onSuccess(response) {
      self.hideLoadingScreen();
      self.presentContractScreen({"isApprovalDisabled":response.isDisabled});
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.isApprovalMatrixDisabled(payload, onSuccess, onError);
  };
  /*
   * @name updateApprovalMatrixStatus
   * @member CompaniesModule.presentationController
   * @param: {"contractId": "","cif": "","disable": "true"}
   */
  PresentationController.prototype.updateApprovalMatrixStatus = function(payload, customerNameId) {
    var self = this; 
    self.showLoadingScreen();
    function onSuccess(response) {
      self.hideLoadingScreen();
      var toastMsgText = payload.disable === "true" ? kony.i18n.getLocalizedString("i18n.frmCompanies.ApprovalsDisabledSuccessfully") +customerNameId:
              kony.i18n.getLocalizedString("i18n.frmCompanies.ApprovalsEnabledSuccessfully") + customerNameId;
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),toastMsgText);
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.updateApprovalMatrixStatus(payload, onSuccess, onError);
  };
    /*
   * @name getAccountActionCustomerApproverList
   * @member CompaniesModule.presentationController
   * @param: {"contractId": "","cif": "","accountId": "","actionId":""}, isCreateFlow,selectedCardInfo
   */
  PresentationController.prototype.getAccountActionCustomerApproverList = function(payload,selectedCardInfo) {
    var self = this; 
    self.showLoadingScreen();
    function onSuccess(response) {
      self.presentContractScreen({"approversList":response.Approvers || [],
                                   "selectedCardInfo":selectedCardInfo});
      self.hideLoadingScreen();
    }
    function onError(error) {
      self.hideLoadingScreen();
      if(error.dbpErrCode=== 10712){ //no approvers error
        self.presentContractScreen({"approversList":[],
                                     "selectedCardInfo":selectedCardInfo
                                    });
      } else{
        self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
      }
    }
    this.businessController.getAccountActionCustomerApproverList(payload, onSuccess, onError);
  };
          /****** APPROVAL MATRIX - end *****/
  PresentationController.prototype.getServiceDefinitionProductIdPermissions = function (payload, selectedCardInfo, formName) {
    var self = this;
    self.showLoadingScreen(formName);
    function onSuccess(response) {
      self.presentContractScreen({ "accountLvlFeatureActions": response.features || [],}, formName );
      self.hideLoadingScreen(formName);
    }
    function onError(error) {
      self.hideLoadingScreen(formName);
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(error),formName);
    }
    this.businessController.getServiceDefinitionProductIdPermissions(payload, onSuccess, onError);
  };

  PresentationController.prototype.fetchServiceDefRoleDataForUser = function (inputParams) {
    var self = this;
    var accInputParam = { "coreCustomerIdList": inputParams.coreCustomerId };
    self.showLoadingScreen();
    var coreCustomerAccounts = [];
    function onSuccess(response) {
      coreCustomerAccounts = response.coreCustomerAccounts.length > 0 ? response.coreCustomerAccounts[0].accounts : [];
      var productsList = formatAccounts(coreCustomerAccounts, 1);
      self.getCoreCustomerRoleFeatureActionLimits(inputParams, coreCustomerAccounts, productsList);
    }

    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(error));

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
              "arrangementRoleId": currRec.ownerType || ""
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
  PresentationController.prototype.getCurrentCustomerDetails = function () {
    return this.CustomerBasicInforObj;
  };
  
  PresentationController.prototype.getCustomerSearchRecords = function () {
    return this.customerSearchRecords;
  };
  
  PresentationController.prototype.getPhoneNumListDetails = function () {
    return this.CustomerContactNumListData;
  };
  
  PresentationController.prototype.getEmailIdsListData = function () {
    return this.CustomerEmailIdsListData;
  };
  
  PresentationController.prototype.getEmailSearchFlag = function() {
    return this.isEmailSearch;
  };
  
  PresentationController.prototype.getCustomerContact = function(legalEntityId) {
    var self = this;
    var customerId = self.getCurrentCustomerDetails().Customer_id || self.getCurrentCustomerDetails().primaryCustomerId;
    var payload = {
      "Customer_id": customerId,
      "partyId": "",
      "legalEntityId":legalEntityId
    };
    function onSuccess(response) {
        response = response.records[0];
        self.CustomerContactNumListData = response.ContactNumbers;
        self.CustomerEmailIdsListData = response.EmailIds;
        self.presentContractScreen({"customerSearch":self.getCustomerSearchRecords()});
    }
    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
      self.presentContractScreen({"AllEligibleRelationalCustomersError":[]});
    }
    this.businessController.getCustomerContact(payload, onSuccess, onError);
  };
  
  PresentationController.prototype.showContractSearch = function(context) {
    var self = this;
    self.showLoadingScreen("frmContractSearch");
    self.callContractsScreen();
    if(context){}
    else{
      context = {action : "fetch"};
    }
    self.presentUserInterface("frmContractSearch",context);
  };
  
  PresentationController.prototype.presentContractSearchScreen = function(context){
    var self = this;
    self.presentUserInterface("frmContractSearch",context);
  };
  
  return PresentationController;
});

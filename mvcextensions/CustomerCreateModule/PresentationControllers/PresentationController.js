define(['Promisify','ErrorInterceptor'], function(Promisify,ErrorInterceptor) {
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function PresentationController() {
        this.customerCreateModel = {
          companyDetails:null,
          accounts:null,
          roles:null,
          isUsernameAvailable : null,
          OFACVerification: null,
          editInputs : null,
          customerLimits: null,
          context : null,
          customerAccounts : null,
          featuresAndActions : null,
          navigationParams :null,
          customers :null,
          authSignatoryTypes : null
        };
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);

    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    PresentationController.prototype.initializePresentationController = function() {
        
    };
  /*
   * dispaly create screen when navigate
   *@param: context
   */
  PresentationController.prototype.showCreatecompanyScreen = function(context) {
    var self = this;
    self.showLoadingScreen();
    self.clearToDefaults();
    var comapnyId = context.companyID;
    var promiseGetUsernameRulesAndPolicy = Promisify(this.businessController,'getUsernameRulesAndPolicy');
    var promiseGetAccounts = Promisify(this.businessController, 'getCompanyAccounts');
    var promiseGetAllRolesFeaturesAndActions = Promisify(this.businessController, 'getBusinessTypeGroups');
    var promiseGetAccountSignatories =Promisify(this.businessController, 'fetchAccountSignatories');
    var promiseGetAuthSignatoryTypes = Promisify(this.businessController, 'getBusinessTypes');
    var promiseList=[];
    promiseList.push(
      promiseGetUsernameRulesAndPolicy({}),
      promiseGetAccounts({"Organization_id": comapnyId}),
      promiseGetAllRolesFeaturesAndActions({"id":context.businessTypeId}),
      promiseGetAuthSignatoryTypes({"id":context.businessTypeId})
    );
    if(context.isAccountCentricConfig===true && context.inAuthorizedSignatoriesUi===true)
      promiseList.push(promiseGetAccountSignatories({"organizationId":comapnyId}));
    Promise.all(promiseList).then(function (responses) {
      self.customerCreateModel.companyDetails = context;
      self.customerCreateModel.usernameRulesAndPolicy={
        "usernamerules" : responses[0].usernamerules,
        "usernamepolicy" : responses[0].usernamepolicy
      };
      self.customerCreateModel.accounts = responses[1].OgranizationAccounts;
      self.customerCreateModel.roles = responses[2].groups;
      self.customerCreateModel.authSignatoryTypes = responses[3].BusinessTypeRecords;
      if(context.isAccountCentricConfig===true && context.inAuthorizedSignatoriesUi===true)
        self.customerCreateModel.accountSignatories = responses[4].AccountSignatories;
      self.hideLoadingScreen();
      self.presentCreateScreen(self.customerCreateModel);
    }).catch(function (res) {
      self.hideLoadingScreen();
      self.showToastMessage(ErrorInterceptor.errorMessage(res),kony.i18n.getLocalizedString("i18n.frmGroupsController.error"));
      kony.print("unable to fetch preloaded data",res);
    });	
  };
   /*
    * common function for presentUserInterface action
    * @param: viewmodel of context
    */
    PresentationController.prototype.presentCreateScreen = function(viewModel){
      var self = this;
      self.presentUserInterface('frmCustomerCreate',viewModel);
    };
  /*
   * hide create customer form and navigate to company form
   */
    PresentationController.prototype.hideCreatecompanyScreen = function(context,isLoading,toast) {
      var self = this;
      self.showLoadingScreen();
      self.navigateTo('CompaniesModule', 'showResultFromCustomerScreen', [context,isLoading,toast]);
    };
  /*
   * navigate to customer profile form
   * @param: param- {"Customer_id":""}, formDetails - {"name":"","data":""}
   */
    PresentationController.prototype.navigateToCustomerPersonal = function(param,formDetails) {
      var self = this;
      var context = [param.Customer_id,formDetails];
      this.navigateTo('CustomerManagementModule', 'diplayCustomerProfileFromOtherModule',context);
    };  
  /*
   * display loading screen
   */
    PresentationController.prototype.showLoadingScreen = function() {
        var self = this;
        self.presentCreateScreen({"LoadingScreen":{"focus":true}});
    };
  /*
   * hide loading screen
   */
    PresentationController.prototype.hideLoadingScreen = function() {
        var self = this;
        self.presentCreateScreen({"LoadingScreen":{"focus":false}});
    };
   /*
   * display  toast message
   * @param: status,toast message
   */
    PresentationController.prototype.showToastMessage = function(message,status) {
        var self = this;
        self.presentCreateScreen({"toastMessage":{"status":status,
                                                                  "message":message}});
    };
   /*
   * @name createCustomer
   * @member CustomerCreateModule.presentationController
   */
  PresentationController.prototype.createCustomer = function(context,orgId){
    var self = this;
    self.showLoadingScreen();
    var inputParam = {"action":"createCustomer","id":orgId};
    function completionCreateCustomer(){
      self.hideCreatecompanyScreen(inputParam,true,{"toastMessage":{"status":kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),
                                                                  "message":kony.i18n.getLocalizedString("i18n.frmCompanies.Customer_created_successfully")}});
    }
    function onError(error) {
      self.hideCreatecompanyScreen(inputParam,true,{"toastMessage":{"status":kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),
                                                                  "message":ErrorInterceptor.errorMessage(error)}});
    }
    self.businessController.createCustomer(context, completionCreateCustomer, onError);
  };
  PresentationController.prototype.createSignatory = function(context, orgId){
    var self = this;
    self.showLoadingScreen();
    var inputParam = {"action":"createCustomer","id":orgId};
    function completionCreateSignatory(){
      self.hideCreatecompanyScreen(inputParam,true,{"toastMessage":{"status":kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),
                                                                  "message":kony.i18n.getLocalizedString("i18.authorizedSignatories.createToast")}});
    }
    function onError(error) {
      self.hideCreatecompanyScreen(inputParam,true,{"toastMessage":{"status":kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),
                                                                  "message":ErrorInterceptor.errorMessage(error)}});
    }
    self.businessController.createSignatory(context, completionCreateSignatory, onError);
  };
  PresentationController.prototype.editSignatory = function(context, orgId, navigationParams){
    var self = this;
    self.showLoadingScreen();
    var customerId = {
      "Customer_id": context.id
    };
    var inputParam = {"action":"createCustomer","id":orgId};
    function completionEditSignatory(){
      if (navigationParams) { //back to customer profile
        navigationParams['toast'] = {"status":kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),
                                                                      "message":kony.i18n.getLocalizedString("i18.authorizedSignatories.updateToast")};
        self.navigateToCustomerPersonal(customerId, navigationParams);
      } else { //back to companies
        self.hideCreatecompanyScreen(inputParam,true,{"toastMessage":{"status":kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),
                                                                      "message":kony.i18n.getLocalizedString("i18.authorizedSignatories.updateToast")}});
      }
    }
    function onError(error) {
      if (navigationParams) { //back to customer profile
        navigationParams['toast'] = {"status":kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),
                                                                      "message":ErrorInterceptor.errorMessage(error)};
        self.navigateToCustomerPersonal(customerId, navigationParams);
      } else{
        self.hideCreatecompanyScreen(inputParam,true,{"toastMessage":{"status":kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),
                                                                      "message":ErrorInterceptor.errorMessage(error)}});
      }
    }
    self.businessController.editSignatory(context, completionEditSignatory, onError);
  };
  /*
   * @name verifyUsername and call OFAC verification
   * @member CustomerCreateModule.presentationController
   */
  PresentationController.prototype.verifyUsername = function(context,OFACReqParam){
    var self = this;
    var userAvailable = false;
    self.showLoadingScreen();
    function completionVerifyUsername(response){
      self.clearToDefaults();
      self.hideLoadingScreen();
      if(response.msg === "false"){
        userAvailable = true;
        if(OFACReqParam){
          self.OFACverification(OFACReqParam);
        }
      }else{
        userAvailable = false;
      }
      self.customerCreateModel.isUsernameAvailable = {"userAvailable":userAvailable};
      self.presentCreateScreen(self.customerCreateModel);
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(ErrorInterceptor.errorMessage(error), 
                            kony.i18n.getLocalizedString("i18n.frmGroupsController.error"));
    }
    self.businessController.verifyUsername(context, completionVerifyUsername, onError);
  };
  /*
   * @name OFACverification
   * @member CustomerCreateModule.presentationController
   */
  PresentationController.prototype.OFACverification = function(context){
    var self = this;
    self.showLoadingScreen();
    function completionOFACVerify(response){
      var result;
      self.clearToDefaults();
      self.hideLoadingScreen();
      if((response.msg.indexOf("Successful")>= 0) && response.Status === "true"){
        result = {"canProceed":true};
      }else {
        result = {"canProceed":false};
      }
      self.customerCreateModel.OFACVerification = result;
      self.presentCreateScreen(self.customerCreateModel);
    }
    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessage(ErrorInterceptor.errorMessage(error),
                            kony.i18n.getLocalizedString("i18n.frmGroupsController.error"));
    }
    self.businessController.verifyOFACandCIP(context, completionOFACVerify, onError);
  };
  /*
   * @name showEditCustomerScreen
   * @member CustomerCreateModule.presentationController
   * @param: {"id": "","DateOfBirth": "","DrivingLicenseNumber": "","FirstName": "","LastName": "","Lastlogintime": "","MiddleName":"","Ssn": "","UserName": "","createdts": "","role_name": "","status": "","Email": "","Phone": "",
	          "company": {"UserName": "","id": "","TypeId": "TYPE_ID_SMALL_BUSINESS"}}
              navigationParams- {"selectTab":""}
   */
  PresentationController.prototype.showEditCustomerScreen = function(context,navigationParams){
    var self =this;
    self.showLoadingScreen();
    self.clearToDefaults();
    self.callsForEditCustomer(context, navigationParams);    
  };
  PresentationController.prototype.callsForEditCustomer = function(context, navigationParams){
    var self =this;
    self.showLoadingScreen();
    var companyId = context.company.id;
    var promiseGetAccounts = Promisify(this.businessController, 'getCompanyAccounts');
    var promiseGetCustomerAccounts = Promisify(this.businessController, 'getCustomerAccounts');
    var promiseGetAllRolesFeaturesAndActions = Promisify(this.businessController, 'getBusinessTypeGroups');
    var promiseGetCustomerFeaturesAndActions = Promisify(this.businessController, 'getCustomerFeaturesAndActions');
    var promiseGetAuthSignatoryTypes = Promisify(this.businessController, 'getBusinessTypes');
    var promiseFunctionsList=[];
    promiseFunctionsList.push(promiseGetAccounts({"Organization_id": companyId}),
                              promiseGetCustomerAccounts({"Customer_id":context.id}),
                              promiseGetAllRolesFeaturesAndActions({"id":context.company.businessTypeId}),
                              promiseGetCustomerFeaturesAndActions({"username":context.UserName}),
                              promiseGetAuthSignatoryTypes({"id":context.company.businessTypeId}));
   
    Promise.all(promiseFunctionsList).then(function (responses) {
      self.customerCreateModel.editInputs = context;
      self.customerCreateModel.accounts = responses[0].OgranizationAccounts;
      self.customerCreateModel.customerAccounts = responses[1].Accounts;
      self.customerCreateModel.roles = responses[2].groups;
      self.customerCreateModel.featuresAndActions = responses[3].groups; 
      if(navigationParams){
        self.customerCreateModel.navigationParams = navigationParams;
      }
      self.customerCreateModel.authSignatoryTypes = responses[4].BusinessTypeRecords;
      self.hideLoadingScreen();
      self.presentCreateScreen(self.customerCreateModel);
    }).catch(function (res) {
      self.hideLoadingScreen();
      self.showToastMessage(ErrorInterceptor.errorMessage(res),kony.i18n.getLocalizedString("i18n.frmGroupsController.error"));
      kony.print("unable to fetch preloaded data",res);
    });	
  };
 
  /*
   * @name editCustomer
   * @member CustomerCreateModule.presentationController
   */
  PresentationController.prototype.editCustomer = function(context,orgId,navigationParams){
    var self = this;
    self.showLoadingScreen();
    var customerId = {"Customer_id":context.id};
    var inputParam = {"action":"createCustomer","id":orgId};
    function completionEditCustomer(response){
      self.hideLoadingScreen();
      if(navigationParams){ //back to customer profile
        navigationParams['toast'] = {"status":kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),
                                                                      "message":kony.i18n.getLocalizedString("i18n.frmCompanies.Customer_updated_successfully")};
        self.navigateToCustomerPersonal(customerId, navigationParams);
      } else { //back to companies
        self.hideCreatecompanyScreen(inputParam,true,{"toastMessage":{"status":kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),
                                                                      "message":kony.i18n.getLocalizedString("i18n.frmCompanies.Customer_updated_successfully")}});
      }
    }
    function onError(error) {
      self.hideLoadingScreen();
      if(navigationParams){ //back to customer profile
        navigationParams['toast'] = {"status":kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),
                                                                  "message":ErrorInterceptor.errorMessage(error)};
        self.navigateToCustomerPersonal(customerId, navigationParams);
      } else{ //back to companies
        self.hideCreatecompanyScreen(inputParam,true,{"toastMessage":{"status":kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),
                                                                  "message":ErrorInterceptor.errorMessage(error)}});
      }
      
    }
    self.businessController.editCustomer(context, completionEditCustomer, onError);
  };
   /*
   * clear viewmodel to default values
   */
   PresentationController.prototype.clearToDefaults = function(){
    var self = this;
    self.customerCreateModel.accounts = null;
    self.customerCreateModel.roles = null;
    self.customerCreateModel.companyDetails = null;
    self.customerCreateModel.isUsernameAvailable = null;
    self.customerCreateModel.OFACVerification = null;
    self.customerCreateModel.context = null;
    self.customerCreateModel.editInputs = null;
    self.customerCreateModel.customerLimits = null;
    self.customerCreateModel.customerAccounts = null;
    self.customerCreateModel.featuresAndActions = null; 
    self.customerCreateModel.navigationParams = null;
    self.customerCreateModel.customers = null;
    self.customerCreateModel.authSignatoryTypes = null;
  };
  
  PresentationController.prototype.getUsernameRulesAndPolicy = function() {
    var self = this;
    self.showLoadingScreen();
     
    function successCallback(response) {
      var context = {
        "usernameRulesAndPolicy" : {
        	"usernamerules" : response.usernamerules,
        	"usernamepolicy" : response.usernamepolicy
      	}
      };
      self.presentCreateScreen(context);
      self.hideLoadingScreen();
    }

    function failureCallback(error) {
      self.showToastMessage(ErrorInterceptor.errorMessage(error), kony.i18n.getLocalizedString("i18n.frmGroupsController.error"));
      self.hideLoadingScreen();
    }

    self.businessController.getUsernameRulesAndPolicy({}, successCallback, failureCallback);
  };
    PresentationController.prototype.getCustomerFeaturesAndActions = function (context) {
    var self = this;
    	self.showLoadingScreen();

    function successCallback(response) {
      self.clearToDefaults();
      self.customerCreateModel.featuresAndActions = response.groups;
      self.hideLoadingScreen();
      self.presentCreateScreen(self.customerCreateModel);
    }

    function failureCallback(error) {
      self.hideLoadingScreen();
      self.showToastMessage(ErrorInterceptor.errorMessage(error), kony.i18n.getLocalizedString("i18n.frmGroupsController.error"));
    }

    self.businessController.getCustomerFeaturesAndActions(context, successCallback, failureCallback);
  };
  PresentationController.prototype.searchAuthSignatoriesCustCentric = function (context) {
    var self = this;
    self.showLoadingScreen();

    function successCallback(response) {
      self.clearToDefaults();
      self.hideLoadingScreen();
      self.customerCreateModel.customers = response.Customers;
      self.presentCreateScreen(self.customerCreateModel);
    }

    function failureCallback(error) {
      self.hideLoadingScreen();
      self.showToastMessage(ErrorInterceptor.errorMessage(error), kony.i18n.getLocalizedString("i18n.frmGroupsController.error"));
    }

    self.businessController.fetchAuthorizedSignatories(context, successCallback, failureCallback);
  };
  return PresentationController;
});
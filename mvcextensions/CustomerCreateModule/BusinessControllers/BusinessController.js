define([], function () { 

  /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Controller
     */
  function BusinessController() { 

    kony.mvc.Business.Controller.call(this); 

  } 

  inheritsFrom(BusinessController, kony.mvc.Business.Controller); 

  /**
     * Overridden Method of kony.mvc.Business.Controller
     * This method gets called when business controller gets initialized
     * @method
     */
  BusinessController.prototype.initializeBusinessController = function() { 

  }; 

  /**
     * Overridden Method of kony.mvc.Business.Controller
     * This method gets called when business controller is told to execute a command
     * @method
     * @param {Object} kony.mvc.Business.Command Object
     */
  BusinessController.prototype.execute = function(command) { 

    kony.mvc.Business.Controller.prototype.execute.call(this, command);

  };


  /**
     * @name getRoles
     * @member CustomerCreateModule.businessController
     * @param {} context
     * @param (response:{GroupRecords : []})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getRoles = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerGroupsAndEntitlManager")
      .businessController.getRoles(context, onSuccess, onError);
  };

  /**
     * @name getGroupEntitlements
     * @member CustomerCreateModule.businessController
     * @param {} context
     * @param (response:{GroupEntitlements : []})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getGroupEntitlements = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerGroupsAndEntitlManager")
      .businessController.getGroupEntitlements(context, onSuccess, onError);
  };
  /**
     * @name createCustomer
     * @member CustomerCreateModule.businessController
     * @param {} context
     * @param (response:{})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.createCustomer = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.createCustomer(context, onSuccess, onError);
  };
  /**
     * @name verifyUsername
     * @member CustomerCreateModule.businessController
     * @param {} context
     * @param (response:{})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.verifyUsername = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.verifyUsername(context, onSuccess, onError);
  };
  /**
     * @name validateSSN
     * @member CustomerCreateModule.businessController
     * @param {} context
     * @param (response:{})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.validateSSN = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.validateSSN(context, onSuccess, onError);
  };
  /**
     * @name getCompanyAccounts
     * @member CustomerCreateModule.businessController
     * @param {} context
     * @param (response:{})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getCompanyAccounts = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getCompanyAccounts(context, onSuccess, onError);
  };
   /**
     * @name verifyOFACandCIP
     * @member CustomerCreateModule.businessController
     * @param {} context
     * @param (response:{})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.verifyOFACandCIP = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.verifyOFACandCIP(context, onSuccess, onError);
  };
  /**
     * @name getBBCustomerServiceLimit
     * @member CustomerCreateModule.businessController
     * @param {} context
     * @param (response:{})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getBBCustomerServiceLimit = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getBBCustomerServiceLimit(context, onSuccess, onError);
  };
  /**
     * @name editCustomer
     * @member CustomerCreateModule.businessController
     * @param {} context
     * @param (response:{})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.editCustomer = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.editCustomer(context, onSuccess, onError);
  };
  /**
     * @name getCustomerAccounts
     * @member CustomerCreateModule.businessController
     * @param {} context
     * @param (response:{})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getCustomerAccounts = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getCustomerAccounts(context, onSuccess, onError);
  };
  
  /**
     * @name getUsernameRulesAndPolicy
     * @member CustomerCreateModule.businessController
     * @param {} context
     * @param (response:{})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getUsernameRulesAndPolicy = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("PoliciesManager")
      .businessController.fetchUsernamePoliciesCustomer(context, onSuccess, onError);
  };
  
  BusinessController.prototype.getAllRolesFeaturesAndActions = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getAllGroupFeatures(context, onSuccess, onError);
  };
   BusinessController.prototype.getCustomerFeaturesAndActions = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getCustomerFeaturesAndActions(context, onSuccess, onError);
  };
  BusinessController.prototype.fetchAuthorizedSignatories = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.fetchAuthorizedSignatories(context, onSuccess, onError);
  };
  BusinessController.prototype.fetchAccountSignatories = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.fetchAccountSignatories(context, onSuccess, onError);
  };
  BusinessController.prototype.getBusinessTypeGroups = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("BusinessBankingManager")
        .businessController.getBusinessTypeGroups(context, onSuccess, onError);
  };  
  BusinessController.prototype.getBusinessTypes = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getBusinessTypes(context, onSuccess, onError);
  };
  BusinessController.prototype.createSignatory = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.createSignatory(context, onSuccess, onError);
  };
  BusinessController.prototype.editSignatory = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.editSignatory(context, onSuccess, onError);
  };

  return BusinessController;

});
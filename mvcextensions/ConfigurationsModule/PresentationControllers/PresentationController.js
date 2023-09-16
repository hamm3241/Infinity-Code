define(['Promisify','ErrorInterceptor','LegalEntityPermission_Form_Extn'], function(Promisify, ErrorInterceptor,LegalEntityPermissionExtn) {
  /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
  function PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.configModel={criteriaList:[],configurationsList:[]};
  }

  inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);

  /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
  PresentationController.prototype.initializePresentationController = function() {

  };
  
  
  PresentationController.prototype.showServiceDefinition = function(payload) {
    var self = this;
    if (payload !== undefined) {
      self.newPayload = payload;
  }
  if (payload === undefined) {
      payload = self.newPayload;
  }
    self.presentUserInterface('frmServiceDefinition',{"LoadingScreen":{focus:true}});

    function onSuccess(response) {
     self.presentUserInterface('frmServiceDefinition', {
                "custGroupsList": response.ServiceDefinitionRecords
            });
      self.presentUserInterface('frmServiceDefinition', {
        "LoadingScreen": {
          focus: false
        }
      });
      
    }
    function onError(error) {
      self.presentUserInterface('frmServiceDefinition', {
        "LoadingScreen": {
          focus: false
        }
      });
      self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
    }
    if (payload !== undefined) {
      self.businessController.fetchServiceDefinitions(payload, onSuccess, onError);
    }
    };
  
  PresentationController.prototype.showToastMessageFlex = function (msg, status) {
    var self = this;
    var toast ={"toast": {
      message: msg,
      status: status
    }};
    self.presentUserInterface("frmServiceDefinition", toast);
    toast = {};

     };

  PresentationController.prototype.deleteService = function(id) {
    var self = this;
      self.presentUserInterface('frmServiceDefinition',{
        "LoadingScreen": {
          focus: true
        }
      });
    function successCallback(response) {
      self.presentUserInterface('frmServiceDefinition',{"LoadingScreen":{focus:false}});
      self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.ServiceDefinition.DeleteSuccess"),"success");
      //self.showServiceDefinition();
    }

    function failureCallback(error) {
      self.presentUserInterface('frmServiceDefinition',{"LoadingScreen":{focus:false}});
      self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
    }
    this.businessController.deleteServiceDefinition({"id":id}, successCallback, failureCallback);
    };
    
  PresentationController.prototype.fetchEligibilityCriteria = function() {
        var self = this;
      self.presentUserInterface('frmBusinessConfigurations',{
        "LoadingScreen": {
          focus: true
        }
      });
    function successCallback(response) {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      self.configModel.criteriaList = response.eligibilitycriteria;
      self.configModel.configurationsList=null;
      self.presentUserInterface("frmBusinessConfigurations",self.configModel);
    }

    function failureCallback(error) {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      var context="Error";
      self.presentUserInterface('frmBusinessConfigurations',{"toast":{"status":"ERROR","message":ErrorInterceptor.errorMessage(error)}});
      self.presentUserInterface("frmBusinessConfigurations",context);
    }
    this.businessController.fetchEligibilityCriterias({}, successCallback, failureCallback);
    this.presentUserInterface("frmBusinessConfigurations",{});
    };
  PresentationController.prototype.deleteEligibilityCriteria = function(command) {
        var self = this;
      self.presentUserInterface('frmBusinessConfigurations',{
        "LoadingScreen": {
          focus: true
        }
      });
    function successCallback(response) {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      self.presentUserInterface('frmBusinessConfigurations',{"toast":{"status":"SUCCESS","message":kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.deleteCriteriaSuccess")}});
      self.fetchEligibilityCriteria();
    }

    function failureCallback(error) {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      self.presentUserInterface('frmBusinessConfigurations',{"toastMessage":{"status":"ERROR","message": ErrorInterceptor.errorMessage(error)}});
      self.fetchEligibilityCriteria();
    }
    this.businessController.deleteEligibilityCriteria({"id":command}, successCallback, failureCallback);
    this.presentUserInterface("frmBusinessConfigurations",{});
    };
  PresentationController.prototype.updateEligibilityCriteriaStatus = function(command) {
        var self = this;
      self.presentUserInterface('frmBusinessConfigurations',{
        "LoadingScreen": {
          focus: true
        }
      });
    function successCallback(response) {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      if(command.status_id==="SID_INACTIVE")
        self.presentUserInterface('frmBusinessConfigurations',{"toast":{"status":"SUCCESS","message":kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.deactivateCriteriaSuccess")}});
      else
        self.presentUserInterface('frmBusinessConfigurations',{"toast":{"status":"SUCCESS","message":kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.activateCriteriaSuccess")}});
      self.fetchEligibilityCriteria();
    }

    function failureCallback(error) {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      self.presentUserInterface('frmBusinessConfigurations',{"toast":{"status":"ERROR","message":ErrorInterceptor.errorMessage(error)}});
      self.fetchEligibilityCriteria();
    }
    this.businessController.updateEligibilityCriteria(command, successCallback, failureCallback);
    this.presentUserInterface("frmBusinessConfigurations",{});
    };
   PresentationController.prototype.addEligibilityCriteria = function(input) {
        var self = this;
      self.presentUserInterface('frmBusinessConfigurations',{
        "LoadingScreen": {
          focus: true
        }
      });
    function successCallback(response) {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      self.presentUserInterface('frmBusinessConfigurations',{"toast":{"status":"SUCCESS","message":kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.addCriteriaSuccess")}});
      self.fetchEligibilityCriteria();
    }

    function failureCallback(error) {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      self.presentUserInterface('frmBusinessConfigurations',{"toast":{"status":"ERROR","message":ErrorInterceptor.errorMessage(error)}});
      self.presentUserInterface("frmBusinessConfigurations",{});
    }
    this.businessController.addEligibilityCriterias(input, successCallback, failureCallback);
    this.presentUserInterface("frmBusinessConfigurations",{});
    };
    PresentationController.prototype.updateEligibilityCriteria = function(command) {
        var self = this;
      self.presentUserInterface('frmBusinessConfigurations',{
        "LoadingScreen": {
          focus: true
        }
      });
    function successCallback(response) {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      self.presentUserInterface('frmBusinessConfigurations',{"toast":{"status":"SUCCESS","message":kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.updateCriteriaSuccess")}});
      self.fetchEligibilityCriteria();
    }

    function failureCallback(error) {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      self.presentUserInterface('frmBusinessConfigurations',{"toast":{"status":"ERROR","message":ErrorInterceptor.errorMessage(error)}});
      self.presentUserInterface("frmBusinessConfigurations",{});
    }
    this.businessController.updateEligibilityCriteria(command, successCallback, failureCallback);
    this.presentUserInterface("frmBusinessConfigurations",{});
    };
  PresentationController.prototype.fetchAllBusinessConfigurations = function() {
        var self = this;
      self.presentUserInterface('frmBusinessConfigurations',{
        "LoadingScreen": {
          focus: true
        }
      });
    function successCallback(response) {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      self.configModel.criteriaList=null;
      self.configModel.configurationsList = response.BusinessConfigurationRecords;
      self.presentUserInterface("frmBusinessConfigurations",self.configModel);
    }

    function failureCallback(error) {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      var context="Error";
      self.presentUserInterface('frmBusinessConfigurations',{"toast":{"status":"ERROR","message":ErrorInterceptor.errorMessage(error)}});
      self.presentUserInterface("frmBusinessConfigurations",context);
    }
    this.businessController.fetchBusinessConfigurations({}, successCallback, failureCallback);
    this.presentUserInterface("frmBusinessConfigurations",{});
    };
    PresentationController.prototype.updateBusinessConfiguration = function(context,name) {
        var self = this;
      self.presentUserInterface('frmBusinessConfigurations',{
        "LoadingScreen": {
          focus: true
        }
      });
    function successCallback() {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      self.presentUserInterface('frmBusinessConfigurations',{"toast":{"status":"SUCCESS","message":name+kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.BusinessConfigSuccess")}});
      self.fetchAllBusinessConfigurations();
    }

    function failureCallback(error) {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      var status="Error";
      self.presentUserInterface('frmBusinessConfigurations',{"toast":{"status":"ERROR","message":ErrorInterceptor.errorMessage(error)}});
      self.presentUserInterface("frmBusinessConfigurations",status);
    }
    this.businessController.updateBusinessConfiguration(context, successCallback, failureCallback);
    this.presentUserInterface("frmBusinessConfigurations",{});
    };
  
    PresentationController.prototype.fetchCombinedUserCount = function() {
    var self = this;
    self.presentUserInterface('frmBusinessConfigurations', {"LoadingScreen" : { focus : true } });

    function successCallback(response) {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      self.presentUserInterface("frmBusinessConfigurations",{"CombinedUserCount" : response.CombinedUserCount});
    }

    function failureCallback(error) {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      var context="Error";
      self.presentUserInterface('frmBusinessConfigurations',{"toast":{"status":"ERROR","message":ErrorInterceptor.errorMessage(error)}});
      self.presentUserInterface("frmBusinessConfigurations",context);
    }

    this.businessController.getCombinedUserCount({}, successCallback, failureCallback);
    };

  PresentationController.prototype.fetchAlertConfigurations = function() {
    var self = this;
    self.presentUserInterface('frmBusinessConfigurations',{
      "LoadingScreen": {
        focus: true
      }
    });
    function successCallback(response) {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      self.configModel.criteriaList=null;
      self.configModel.configurationsList = null;
      self.configModel.alertConfigurationsList = response.AlertConfigurationRecords;
      self.presentUserInterface("frmBusinessConfigurations",self.configModel);
    }

    function failureCallback(error) {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      var context="Error";
      self.presentUserInterface('frmBusinessConfigurations',{"toast":{"status":"ERROR","message":ErrorInterceptor.errorMessage(error)}});
      self.presentUserInterface("frmBusinessConfigurations",context);
    }
    this.businessController.fetchAlertConfigurations({}, successCallback, failureCallback);
    this.presentUserInterface("frmBusinessConfigurations",{});
  };
  PresentationController.prototype.updateAlertConfiguration = function(context) {
        var self = this;
      self.presentUserInterface('frmBusinessConfigurations',{
        "LoadingScreen": {
          focus: true
        }
      });
    function successCallback() {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      self.presentUserInterface('frmBusinessConfigurations',{"toast":{"status":"SUCCESS","message":kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.AlertSuccessToast")}});
      self.fetchAlertConfigurations();
    }

    function failureCallback(error) {
      self.presentUserInterface('frmBusinessConfigurations',{"LoadingScreen":{focus:false}});
      var status="Error";
      self.presentUserInterface('frmBusinessConfigurations',{"toast":{"status":"ERROR","message":ErrorInterceptor.errorMessage(error)}});
      self.presentUserInterface("frmBusinessConfigurations",status);
    }
    this.businessController.updateAlertConfiguration(context, successCallback, failureCallback);
    this.presentUserInterface("frmBusinessConfigurations",{});
    };


  PresentationController.prototype.fetchBundles = function() {
    var self = this;
    self.presentUserInterface('frmConfigurationBundles', {"LoadingScreen" : { focus : true } });

    var promiseFetchAllBundles = Promisify(this.businessController, 'fetchAllBundles');
    var promiseFetchAllConfigurations = Promisify(this.businessController, 'fetchAllConfigurations');

    Promise.all([
      promiseFetchAllBundles({}),
      promiseFetchAllConfigurations({})
    ]).then(function (responses) {
      self.presentUserInterface('frmConfigurationBundles', {"LoadingScreen" : { focus : false } });
      self.presentUserInterface('frmConfigurationBundles', {
        "fetchAllBundlesAndConfigurationsStatus" : "success",
        "bundles" : responses[0].bundles,
        "configurations" : responses[1].configurations
      });
    }).catch(function (error) {
      self.presentUserInterface('frmConfigurationBundles', {"LoadingScreen" : { focus : false } });
      self.presentUserInterface('frmConfigurationBundles', {"fetchAllBundlesAndConfigurationsStatus" : "error"});
    });
  };

  PresentationController.prototype.fetchConfigurations = function(bundleId) {
    var self = this;
    self.presentUserInterface('frmConfigurationBundles', {"LoadingScreen" : { focus : true } });

    function successCallback(response) {
      self.presentUserInterface('frmConfigurationBundles', {"LoadingScreen" : { focus : false } });
      self.presentUserInterface('frmConfigurationBundles', {"fetchConfigurationsStatus" : "success", "configurations" : response.configurations});
    }

    function failureCallback(error) {
      self.presentUserInterface('frmConfigurationBundles', {"LoadingScreen" : { focus : false } });
      self.presentUserInterface('frmConfigurationBundles', {"fetchConfigurationsStatus" : "error"});
    }

    this.businessController.fetchConfigurations(bundleId, successCallback, failureCallback);
  };

  PresentationController.prototype.addBundleAndConfigurations = function(bundle) {
    var self = this;
    self.presentUserInterface('frmConfigurationBundles', {"LoadingScreen" : { focus : true } });

    function successCallback(response) {
      self.presentUserInterface('frmConfigurationBundles', {"LoadingScreen" : { focus: false } });
      self.presentUserInterface('frmConfigurationBundles', {"addBundleAndConfigurationsStatus" : "success"});
    }

    function failureCallback(error) {
      self.presentUserInterface('frmConfigurationBundles', {"LoadingScreen" : { focus: false } });
      self.presentUserInterface('frmConfigurationBundles', {"addBundleAndConfigurationsStatus" : "failure"});
    }

    this.businessController.manageBundleAndConfigurations(bundle, successCallback, failureCallback);
  };

  PresentationController.prototype.editBundleAndConfigurations = function(bundle) {
    var self = this;
    self.presentUserInterface('frmConfigurationBundles', {"LoadingScreen" : { focus : true } });

    function successCallback(response) {
      self.presentUserInterface('frmConfigurationBundles', {"LoadingScreen" : { focus: false } });
      self.presentUserInterface('frmConfigurationBundles', {"editBundleAndConfigurationsStatus" : "success"});
    }

    function failureCallback(error) {
      self.presentUserInterface('frmConfigurationBundles', {"LoadingScreen" : { focus: false } });
      self.presentUserInterface('frmConfigurationBundles', {"editBundleAndConfigurationsStatus" : "failure"});
    }

    this.businessController.manageBundleAndConfigurations(bundle, successCallback, failureCallback);
  };

  PresentationController.prototype.deleteBundle = function(bundleId) {
    var self = this;
    self.presentUserInterface('frmConfigurationBundles', {"LoadingScreen" : { focus : true } });

    function successCallback(response) {
      self.presentUserInterface('frmConfigurationBundles', {"LoadingScreen" : { focus: false } });
      self.presentUserInterface('frmConfigurationBundles', {"deleteBundleStatus" : "success", "bundleId" : bundleId});
    }

    function failureCallback(error) {
      self.presentUserInterface('frmConfigurationBundles', {"LoadingScreen" : { focus: false } });
      self.presentUserInterface('frmConfigurationBundles', {"deleteBundleStatus" : "failure"});
    }

    this.businessController.deleteBundleAndConfigurations(bundleId, successCallback, failureCallback);
  };

  PresentationController.prototype.deleteConfiguration = function(configurationId) {
    var self = this;
    self.presentUserInterface('frmConfigurationBundles', {"LoadingScreen" : { focus : true } });

    function successCallback(response) {
      self.presentUserInterface('frmConfigurationBundles', {"LoadingScreen" : { focus: false } });
      self.presentUserInterface('frmConfigurationBundles', {"deleteConfigurationStatus" : "success", "configurationId" : configurationId.configurationId});
    }

    function failureCallback(error) {
      self.presentUserInterface('frmConfigurationBundles', {"LoadingScreen" : { focus: false } });
      self.presentUserInterface('frmConfigurationBundles', {"deleteConfigurationStatus" : "failure"});
    }

    this.businessController.deleteBundleAndConfigurations(configurationId, successCallback, failureCallback);
  };
  
  PresentationController.prototype.getAssociatedRoles = function(context,action) {
    var self = this;    
    self.showLoadingScreen();
    function successCallback(response) {
      self.hideLoadingScreen();
      self.presentUserInterface("frmServiceDefinition", {"associatedRoles" : response.roles,"action":action});
    }
    function failureCallback(response) {
      self.hideLoadingScreen();
      self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(response));
    }
    self.businessController.getAssociatedRoles(context, successCallback, failureCallback);
  };
  PresentationController.prototype.getGroups = function(payload) {
    var self = this;    
    let input = {
      "legalEntityId": payload.legalEntityId
    };
    self.showLoadingScreen();
    function successCallback(response) {
      self.hideLoadingScreen();
      self.presentUserInterface("frmServiceDefinition", {"getAllGroups" : response.GroupRecords});
    }
    function failureCallback(response) {
      self.hideLoadingScreen();
      self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(response));
    }
    self.businessController.getGroups(input, successCallback, failureCallback);
  };

  PresentationController.prototype.getGroupFeatureActions = function(context) {
    var self = this;    
    self.showLoadingScreen();
    function successCallback(response) {
      self.hideLoadingScreen();
      self.presentUserInterface("frmServiceDefinition", {"getGroupFeaturesAction" : response});
    }
    function failureCallback(response) {
      self.hideLoadingScreen();
      self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(response));
    }
    self.businessController.getGroupFeatureActions(context, successCallback, failureCallback);
  };

  PresentationController.prototype.showLoadingScreen = function() {
    var self = this;
    self.presentUserInterface("frmServiceDefinition",{"LoadingScreen":{"focus":true}});
  };
  PresentationController.prototype.hideLoadingScreen = function() {
    var self = this;
    self.presentUserInterface("frmServiceDefinition",{"LoadingScreen":{"focus":false}});
  };

  PresentationController.prototype.fetchFeaturesAndActions = function(context) {
    var self = this;
    self.presentUserInterface('frmServiceDefinition', {
      "LoadingScreen": {
        focus: true
      }
    });

    function onCustomersCompletionCallBack(response) {
      //self.clearToDefault();
      self.showFeaturesActionScreen({
        "fetchFeaturesAndActions": response
      });
      self.presentUserInterface('frmServiceDefinition', {
        "LoadingScreen": {
          focus: false
        }
      });
    }

    function onError(error) {
      self.presentUserInterface('frmServiceDefinition', {
        "LoadingScreen": {
          focus: false
        }
      });
      self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
    }
    self.businessController.fetchFeaturesAndActions(context, onCustomersCompletionCallBack, onError);
  };
  PresentationController.prototype.showFeaturesActionScreen = function(viewModel) {
    var self = this;
    if (viewModel) {
      self.presentUserInterface("frmServiceDefinition", viewModel);
    } else {
      self.presentUserInterface("frmServiceDefinition");
    }
  };
  PresentationController.prototype.updateDefaultRole = function(context,action) {
    var self = this;    
    self.showLoadingScreen();
    function successCallback() {
      self.hideLoadingScreen();
      self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),kony.i18n.getLocalizedString("i18n.frmBusinessTypes.message.updateSuccessful"));
      if(action==="VIEW")
        self.presentUserInterface("frmServiceDefinition", {"action":action,"defaultRoleId":context.defaultRole});
      else 
        self.getAssociatedRoles();
    }
    function failureCallback(response) {
      self.hideLoadingScreen();
      self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(response));
    }
    self.businessController.updateDefaultRole(context, successCallback, failureCallback);
  };
  
  PresentationController.prototype.fetchAllFeaturesAndActions = function(payload) {
    var self = this;
	self.showLoadingScreen();

    function onCompletionCallBack(response) {
			var filtereddata = response.groups.filter(function(rec) {
            if (rec.groupid === payload.roleTypeId) return rec;
        });
            self.showAllFeaturesAndActions({
                "allFeaturesAndActions": filtereddata
            });
            self.hideLoadingScreen();
        }

    function onError(error) {
      self.hideLoadingScreen();
      self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
    }
    self.businessController.getAllFeaturesAndActions(payload, onCompletionCallBack, onError);
  };
    PresentationController.prototype.showAllFeaturesAndActions = function(viewModel) {
        var self = this;
        
        if (viewModel.allFeaturesAndActions.length>0) {
            self.presentUserInterface("frmServiceDefinition", viewModel);
        } else {
            self.presentUserInterface("frmServiceDefinition");
        }
    };
  PresentationController.prototype.createServiceDefinition = function (createData) {
    var self = this;
    self.showLoadingScreen();
    function onCompletionCallBack(response) {
      self.hideLoadingScreen();
      self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.frmServiceDefinition.successCreatingServiceDefinition"), "success");
      self.showServiceDefinition();
    }
    
    function onError(response) {
      self.hideLoadingScreen();
      self.showToastMessageFlex(ErrorInterceptor.errorMessage(response), "error");
      self.showServiceDefinition();
    }
    
    self.businessController.createServiceDefinition(createData, onCompletionCallBack, onError);
  };
  
    PresentationController.prototype.editServiceDefinition = function (editData) {
    var self = this;
    self.showLoadingScreen();
    function onCompletionCallBack(response) {
      self.hideLoadingScreen();
      self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.frmServiceDefinition.successEditingServiceDefinition"), "success");
      self.showServiceDefinition();
    }
    
    function onError(response) {
      self.hideLoadingScreen();
      self.showToastMessageFlex(ErrorInterceptor.errorMessage(response), "error");
      self.showServiceDefinition();
    }
    
    self.businessController.editServiceDefinition(editData, onCompletionCallBack, onError);
  };
  
  PresentationController.prototype.manageServiceDefinitionStatus = function (reqParam) {
       var self = this;
       var text = "";
       self.showLoadingScreen();
       if (reqParam.status === "SID_ACTIVE") {
         text = kony.i18n.getLocalizedString("i18n.Groups.Activation");
       } else {
         text = kony.i18n.getLocalizedString("i18n.Groups.Deactivation");
       }

       function onCompletionCallBack(response) {
         self.hideLoadingScreen();
         self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.frmServiceDefinition.serviceDefinition") + " " + text + " " + kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Successful"), "success");
         //self.showServiceDefinition();
       }

       function onError(error) {
         self.showLoadingScreen();
         self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
         //self.showServiceDefinition();
       }
       self.businessController.manageServiceDefinitionStatus(reqParam, onCompletionCallBack, onError);
     };
  PresentationController.prototype.fetchFeaturesForEdit = function (reqParam) {
        var self = this;
		var viewModel={};
        var promiseFetchAllFeatures = Promisify(this.businessController, 'getAllFeaturesAndActions');
        var promiseFetchServiceFeatures = Promisify(this.businessController, 'fetchFeaturesAndActions');
    	var promiseFetchRoles = Promisify(this.businessController, 'getAssociatedRoles');
        Promise.all([
              promiseFetchAllFeatures({
                        "roleTypeId":reqParam.type,
                        "legalEntityId" : reqParam.entityId
              }),
            promiseFetchServiceFeatures({
                "serviceDefinitionId": reqParam.id
            }),
          	promiseFetchRoles({
                "serviceDefinitionId": reqParam.id
            })
        ]).then(function(responses) {
            var filtereddata = responses[0].groups.filter(function(rec) {
                if (rec.groupid === reqParam.type) return rec;
            });
            viewModel.features = filtereddata[0].features;
            viewModel.serviceFeaturesForEdit = responses[1].features;
          	viewModel.associatedRolesForEdit = responses[2].roles;
            self.presentUserInterface("frmServiceDefinition", viewModel);
            self.hideLoadingScreen();
        }).catch(function(error) {
            self.hideLoadingScreen();
            self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
        });
  };
  PresentationController.prototype.fetchLegalEntityList = function () {
    var self = this;
    var legalEntityList = LegalEntityPermissionExtn.getLEListForFormAction("frmServiceDefinition",'VIEW');
    return legalEntityList;
  };
  
   PresentationController.prototype.getAccessPolicies = function() {
     var self = this;
     function onCompletionCallBack(response) {
       self.presentUserInterface("frmServiceDefinition", {
         "accessPolicies": response.AccessPolicyRecords
       });
     }
     function onError(error) {
       self.showToastMessageFlex(ErrorInterceptor.errorMessage(error), "error");
     }
     self.businessController.getAccessPolicies({}, onCompletionCallBack, onError);
   };

  return PresentationController;
});
define(['Promisify','ErrorInterceptor'], function (Promisify,ErrorInterceptor) {
  /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
  function PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);

  /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
  PresentationController.prototype.initializePresentationController = function () {

  };

  PresentationController.prototype.showLoadingScreen = function () {
    var self = this;
    this.presentUserInterface(this.currentForm, { "loadingScreen": { "focus": true } });
  };

  PresentationController.prototype.hideLoadingScreen = function () {
    var self = this;
    this.presentUserInterface(this.currentForm, { "loadingScreen": { "focus": false } });
  };

  PresentationController.prototype.showToastMessage = function (status, message) {
    var self = this;
    this.presentUserInterface(this.currentForm, {
      "toastMessage": {
        "status": status,
        "message": message
      }
    });
  };

  PresentationController.prototype.showMFAConfigurations = function (context) {
    var self = this;
    context = {
      mfaConfigList: "mfaConfigList"
    };
    this.currentForm = "frmMFAConfigurations";
    this.getAllMFAConfigurations({});
  };
  PresentationController.prototype.navigateToMFAConfigurations = function () {
    var self = this;
    self.navigateTo('MFAModule', 'showMFAConfigurations', []);
  };
  PresentationController.prototype.navigateBackToMFAScenario = function () {
    var self = this;
    self.navigateTo('MFAModule', 'showMFAScenarios', []);
  };
  PresentationController.prototype.showMFAScenarios = function (context) {
    var self = this;
    context = {
      mfaScenariosList: "mfaScenariosList"
    };
    this.currentForm = "frmMFAScenarios";
    this.presentUserInterface("frmMFAScenarios", context);
  };

  PresentationController.prototype.getAllMFAConfigurations = function (context) {
    var self = this;
    function completionGetAllConfigurationsCallback(response) {
      self.presentUserInterface(self.currentForm, {
        "getMFAConfigurations": response.mfaTypes
      });
      self.hideLoadingScreen();
    }

    function onError(error) {
      self.presentUserInterface(self.currentForm, {
        "getMFAConfigurations": []
      });
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(error));
      self.hideLoadingScreen();
    }
    this.showLoadingScreen();
    this.businessController.getAllMFAConfigurations(context, completionGetAllConfigurationsCallback, onError);
  };

  PresentationController.prototype.updateMFAConfiguration = function (context) {
    var self = this;
    function completionUpdateMFAConfigurationCallback(response) {
      self.presentUserInterface(self.currentForm, {
        "updateMFAConfiguration": response.status
      });
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"), kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.UpdatedSuccessfully"));
    }


    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(error));
      self.hideLoadingScreen();
    }
    this.showLoadingScreen();
    this.businessController.updateMFAConfiguration(context, completionUpdateMFAConfigurationCallback, onError);
  };
  

  PresentationController.prototype.fetchMFAScenarios = function (context) {
    var self = this;
    function completionFetchMFAScenariosCallback(response) {
      self.presentUserInterface(self.currentForm, {
        "fetchMFAScenarios": response.mfaScenarios
      });
      self.hideLoadingScreen();
    }

    function onError(error) {
      self.presentUserInterface(self.currentForm, {
        "fetchMFAScenarios": []
      });
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(error));
      self.hideLoadingScreen();
    }
    this.showLoadingScreen();
    this.businessController.fetchMFAScenarios(context, completionFetchMFAScenariosCallback, onError);
  };


  PresentationController.prototype.loadMasterData = function(callback) {
    var self = this;
    this.showLoadingScreen();
    self.masterData = {
      actions:[],
      mfaTypes:[],
      mfaReferenceVariables:[],
      frequencyTypes:[],
      isLoaded:false
    };
    var promiseFetchMFAScenarios = Promisify(this.businessController, 'fetchMFAScenarios');
    var promiseFetchAppList = Promisify(this.businessController, 'fetchApplicationsList');
    var promiseFetchMFATypes = Promisify(this.businessController, 'fetchMFATypes');
    var promiseFetchFrequencyTypes = Promisify(this.businessController, 'fetchFrequencyTypes');
    var promiseFetchVariableReference = Promisify(this.businessController, 'getMFAVariableReferences');
    var promiseFetchFeaturesList = Promisify(this.businessController, 'fetchFeaturesList');
    Promise.all([
      promiseFetchMFAScenarios({}),
      promiseFetchMFATypes({}),
      promiseFetchFrequencyTypes({}),
      promiseFetchAppList({}),
      promiseFetchVariableReference({}),
      promiseFetchFeaturesList({})
    ]).then(function (responses) {
      
      var fetchMFAScenarios = responses[0].mfaScenarios;
      self.masterData.mfaTypes = responses[1].mfaTypes;
      self.masterData.frequencyTypes = responses[2].frequencyTypes;
      self.masterData.appsList = responses[3].apps;
      var varReference = responses[4].mfavariablereference;
      var featuresList = responses[5].features;
      self.masterData.isLoaded = true;
      self.presentUserInterface(self.currentForm, {
        "fetchMFAScenarios": fetchMFAScenarios,
        "masterData": self.masterData,
        "variableReference": varReference,
        "featuresList": featuresList
      });
      self.hideLoadingScreen();
    }).catch(function (res) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(res));
      kony.print("unable to fetch preloaded data",res);
    });
  };
  PresentationController.prototype.getFeaturesList = function (context) {
    var self = this;
    function completionGetFeaturesCallback(response) {
      self.presentUserInterface(self.currentForm, {
        "featuresList": response.features
      });
      self.hideLoadingScreen();
    }

    function onError(error) {
      self.presentUserInterface(self.currentForm, {
        "featuresList": []
      });
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(error));
      self.hideLoadingScreen();
    }
    this.showLoadingScreen();
    this.businessController.fetchFeaturesList(context, completionGetFeaturesCallback, onError);
  };
  
  PresentationController.prototype.getAction = function (context) {
    var self = this;
    function completionGetActionCallback(response) {
      if(!context.actionType)
      self.presentUserInterface(self.currentForm, {
        "featureTypeActions": response.actions
      });
      else 
        self.presentUserInterface(self.currentForm, {
        "featureMFATypeActions": response.actions
      });
      self.hideLoadingScreen();
    }

    function onError(error) {
      self.presentUserInterface(self.currentForm, {
        "featureTypeActions": []
      });
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(error));
      self.hideLoadingScreen();
    }
    this.showLoadingScreen();
    this.businessController.fetchAction(context, completionGetActionCallback, onError);
  };
  
  PresentationController.prototype.createMFAScenario = function (context) {
    var self = this;
    function completionCreateMFAScenarioCallback(response) {
      self.presentUserInterface(self.currentForm, {
        "createMFAScenario": response.status
      });
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"), kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Scenario_create_success"));
    }


    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(error));
      self.hideLoadingScreen();
    }
    this.showLoadingScreen();
    this.businessController.createMFAScenario(context, completionCreateMFAScenarioCallback, onError);
  };
  
  PresentationController.prototype.updateMFAScenario = function (context,scenario) {
    var self = this;
    function completionUpdateMFAScenarioCallback(response) {
      self.presentUserInterface(self.currentForm, {
        "createMFAScenario": response.status
      });
      self.hideLoadingScreen();
      if(scenario==="Status Update"){
        if(context.mfaScenarioStatusId === "SID_INACTIVE")
      		self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"), kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Scenario_deactivate_success"));
        else
          	self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"), kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Scenario_activate_success"));
      }else
        self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"), kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Scenario_update_success"));
    }


    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(error));
      self.hideLoadingScreen();
    }
    this.showLoadingScreen();
    this.businessController.updateMFAScenario(context, completionUpdateMFAScenarioCallback, onError);
  };
  
  PresentationController.prototype.deleteMFAScenario = function (context) {
    var self = this;
    function completionDeleteMFAScenarioCallback(response) {
      self.presentUserInterface(self.currentForm, {
        "createMFAScenario": response.status
      });
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"), kony.i18n.getLocalizedString("i18n.frmMFAScenarios.DeletedSuccessfully"));
    }


    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(error));
      self.hideLoadingScreen();
    }
    this.showLoadingScreen();
    this.businessController.deleteMFAScenario(context, completionDeleteMFAScenarioCallback, onError);
  };
  
  
  PresentationController.prototype.getMFAVariableReferences = function (callback) {
    var self = this;
    function completionGetMFAVariableReferencesCallback(response) {
      callback(response.mfavariablereference);
      self.hideLoadingScreen();
    }


    function onError(error) {
      callback("error");
      self.hideLoadingScreen();
    }
    this.showLoadingScreen();
    this.businessController.getMFAVariableReferences({}, completionGetMFAVariableReferencesCallback, onError);
  };
    PresentationController.prototype.fetchMFAScenariosById = function (context) {
    var self = this;
    function completionFetchMFAScenariosCallback(response) {
      self.presentUserInterface(self.currentForm, {
        "fetchMFAScenariosById": response.mfaScenarios
      });
      self.hideLoadingScreen();
    }

    function onError(error) {
      self.presentUserInterface(self.currentForm, {
        "fetchMFAScenariosById": []
      });
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(error));
      self.hideLoadingScreen();
    }
    this.showLoadingScreen();
    this.businessController.fetchMFAScenarios(context, completionFetchMFAScenariosCallback, onError);
  };
  
  
  return PresentationController;
});



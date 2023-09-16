define(['Promisify', 'ErrorInterceptor', 'ErrorIsNetworkDown'], function(Promisify, ErrorInterceptor, isNetworkDown) {

  function CampaignModule_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.campaignConfigurations = null ;
    this.allDatasets = null ;
    this.allPriorities = [];
    this.currentCampaignFilter = null;
  }

  inheritsFrom(CampaignModule_PresentationController, kony.mvc.Presentation.BasePresenter);

  CampaignModule_PresentationController.prototype.initializePresentationController = function() {
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
  /**
     * @name fetchCampaigns
     * @member CampaignModule.presentationController
     * 
     */
  CampaignModule_PresentationController.prototype.fetchCampaigns = function(isCampaignUpdated) {
    var self = this; 
    self.showProgressBarCampaign();
    function onSuccess(response) {
      var responseObj = {
        "fetchCampaigns": "success",
        "campaignsList": response.campaignList,
      };
      if(isCampaignUpdated){
        responseObj.action = "createOrUpdateStatus" ;
        responseObj.status = isCampaignUpdated.status;
        responseObj.msg = isCampaignUpdated.msg ;
      }
      self.presentUserInterface('frmAdManagement',responseObj);
      self.hideProgressBarCampaign();
    }

    function onError(error) {
      let errorMessage = error.message ? error.message : ErrorInterceptor.errorMessage(error);
      self.presentUserInterface('frmAdManagement', {
        "fetchCampaigns": "failure",
        "message" : errorMessage
      });
      self.hideProgressBarCampaign();
    }
    this.businessController.getCampaignMS({}, onSuccess, onError);
  };

  CampaignModule_PresentationController.prototype.fetchCampaignURLandGroups = function(campaignId) {
    var self = this;
    self.showProgressBarCampaign();
    var payload = {
      "campaignId" : campaignId
    };
    function onSuccess(response) {
      self.presentUserInterface('frmAdManagement', {
        "fetchURLandGroups": "success",
        "campaignSpecifications": response.campaignSpecifications,
        "campaignGroups": response.campaignGroups
      });
      self.hideProgressBarCampaign();
    }

    function onError(response) {
      self.presentUserInterface('frmAdManagement', {
        "fetchURLandGroups": "failure"
      });
      self.hideProgressBarCampaign();
    }

    this.businessController.fetchCampaignURLandGroups(payload,onSuccess,onError);
  };

  CampaignModule_PresentationController.prototype.getAllDefaultCampaigns = function() {
    var self = this;
    self.showProgressBarCampaign();
    function onSuccess(response) {
      self.presentUserInterface('frmAdManagement', {
        "getAllDefaultCampaigns": "success",
        "campaignLists": response.campaignList
      });
      self.hideProgressBarCampaign();
    }
    function onError(response) {
      self.presentUserInterface('frmAdManagement', {
        "getAllDefaultCampaigns": "failure"
      });
      self.hideProgressBarCampaign();
    }
    self.businessController.getAllDefaultCampaigns({},onSuccess,onError);
  };

  CampaignModule_PresentationController.prototype.updateCampaignStatus = function(context){
    var self = this;
    self.showProgressBarCampaign();
    function onSuccess(response) {
      self.fetchCampaigns();
      self.presentUserInterface('frmAdManagement', {
        "updatedCampaignStatus": "success",
        "toastMessage":kony.i18n.getLocalizedString("i18n.frmAdManagement.UpdatedSuccessfully")
      });
      self.hideProgressBarCampaign();
    }
    function onError(response) {
      self.presentUserInterface('frmAdManagement', {
        "updatedCampaignStatus": "failure",
        "toastMessage":"Update failure"
      });
      self.hideProgressBarCampaign();
    }
    this.businessController.updateCampaignStatus(context,onSuccess,onError);
  };

  CampaignModule_PresentationController.prototype.updateCampaignStatusOnView = function(context){
    var self = this;
    self.showProgressBarCampaign();
    function onSuccess(response) {
      self.presentUserInterface('frmAdManagement', {
        "action": "updateCampaignStatus",
        "status" : "success",
        "msg" : kony.i18n.getLocalizedString("i18n.frmAdManagement.UpdatedSuccessfully")
      });
      self.hideProgressBarCampaign();
    }

    function onError(response) {
      self.presentUserInterface('frmAdManagement', {
        "action": "updateCampaignStatus",
        "status" : "failure",
        "msg" : "Update failure"
      });
      self.hideProgressBarCampaign();
    }
    this.businessController.updateCampaignStatus(context, onSuccess, onError);
  };

  CampaignModule_PresentationController.prototype.showProgressBarCampaign = function(){
    this.showCampaigns({progressBar : {
      show : "success"
    }});
  };
  CampaignModule_PresentationController.prototype.hideProgressBarCampaign = function(){
    this.showCampaigns({progressBar : {
      show : "fail"
    }});
  };

  CampaignModule_PresentationController.prototype.showCampaigns = function(context) {
    this.currentForm = "frmAdManagement";
    this.presentUserInterface("frmAdManagement",context);
  };

  CampaignModule_PresentationController.prototype.getCampaignConfigurations = function() {
    var self = this; 
    this.currentForm = "frmAdDetails";

    function onSuccess(response) {
      self.presentUserInterface("frmAdDetails", {
        "action" : "createCampaign",
        "screens" : response ? response.screens : self.campaignConfigurations.screens
      });
    }

    function onError(response) {
      self.fetchCampaigns({status : "failure",msg : kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorCampaignConfigurations") });
    }
    if(self.campaignConfigurations === null) {
      this.businessController.fetchCampaignMasterData({},onSuccess,onError);
    } else {
      onSuccess() ;
    }
  };

  CampaignModule_PresentationController.prototype.fetchCampaignPriorities = function() {
    var self = this; 
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.presentUserInterface("frmAdDetails", {
        "action" : "CampaignPriorityList" ,
        "campaignList" : response.campaignPriorityList,
        "LoadingScreen" : {"focus" : false}
      });
    }

    function onError(error) {
      self.showToastMessage("frmAdDetails",ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    this.businessController.fetchCampaignPriorities({},onSuccess,onError);
  };

  CampaignModule_PresentationController.prototype.fetchCustomerGroups = function() {
    var self = this; 
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.presentUserInterface("frmAdDetails", {
        "action" : "getCustomerGroups",
        "customerRoles" : response,
        "LoadingScreen" : {"focus" : false}
      });
    }
    function onError(response) {
      self.showToastMessage("frmAdDetails",ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    this.businessController.fetchCustomerGroups({},onSuccess,onError);      
  };

  CampaignModule_PresentationController.prototype.createCampaign = function(context) {
    var self = this; 
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.fetchCampaigns({status : "success",msg : kony.i18n.getLocalizedString("i18n.frmAdManagement.CreatedSuccessfully") });
    }
    function onError(error) {
      self.showToastMessage("frmAdDetails",ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    self.businessController.createCampaign(context,onSuccess,onError);      
  };

  CampaignModule_PresentationController.prototype.getEditCampaignDetails = function(context){
    var self = this; 
    var hasSpecifications = false;
    self.showProgressBarCampaign();
    function onSuccess(response) {
      context.campaignSpecifications = response.campaignSpecifications;
      context.campaignGroups = response.campaignGroups;
      self.presentUserInterface('frmAdDetails', {
        "action" : context.isCopy ? "copyCampaign" : "editCampaign",
        "campaignData" : context,
        "campaignSpecifications" : self.campaignConfigurations,
        "LoadingScreen" : {"focus" : false}
      });
    }

    function onError(response) {
      self.fetchCampaigns({status : "failure",msg : kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorCampaignDetails") });
    }

    function getConfigurationsSuccess(response) {
      self.campaignConfigurations = response ? {"screens":response.screens} : self.campaignConfigurations;
      self.businessController.fetchCampaignURLandGroups({"campaignId" : context.id},onSuccess,onError);
    }

    function getConfigurationsfailure(response) {
      self.fetchCampaigns({status : "failure",msg : kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorCampaignConfigurations") });
    }
    if(self.campaignConfigurations === null) {
      hasSpecifications = true;
      self.businessController.fetchCampaignMasterData({},getConfigurationsSuccess,getConfigurationsfailure);
    } else {
      getConfigurationsSuccess();
    }
  };

  CampaignModule_PresentationController.prototype.updateCampaign = function(context) {
    var self = this; 
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.fetchCampaigns({status : "success",msg : kony.i18n.getLocalizedString("i18n.frmAdManagement.UpdatedSuccessfully") });
    }
    function onError(error) {
      self.showToastMessage("frmAdDetails",ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    self.businessController.updateCampaign(context,onSuccess,onError);      
  };

  CampaignModule_PresentationController.prototype.showToastMessage = function(form,message, status){
    var self = this; 
    self.presentUserInterface(form, {toastModel : {
      message : message,
      status : status
    }, "LoadingScreen" : {"focus" : false} });
  };

  CampaignModule_PresentationController.prototype.updateDefaultCampaign = function(context) {
    var self = this; 
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.fetchCampaigns({status : "success",msg : kony.i18n.getLocalizedString("i18n.frmAdManagement.UpdatedSuccessfully") });
    }
    function onError(error) {
      self.showToastMessage("frmAdDetails",ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    self.businessController.updateDefaultCampaign(context,onSuccess,onError);      
  };

  CampaignModule_PresentationController.prototype.editDefaultCampaign = function(context) {
    var self = this;
    self.presentUserInterface("frmAdDetails", {
      "action" : "defaultCampaign",
      "defaultCampaignObject" : context
    });
  };

  CampaignModule_PresentationController.prototype.isCampaignNameExists = function(context) {
    var self = this; 
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.presentUserInterface('frmAdDetails', {
        "action" : "validateCampaignName",
        "campaignExists" : response.campaignExists,
        "LoadingScreen" : {"focus" : false}
      });
    }
    function onError(error) {
      self.showToastMessage("frmAdDetails",ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    self.businessController.isCampaignNameExists(context,onSuccess,onError);      
  };

  CampaignModule_PresentationController.prototype.updateCampaignSettings = function(context) {
    var self = this; 
    self.showProgressBarCampaign();
    function onSuccess(response) {
      self.presentUserInterface('frmAdManagement', {
        "action": "updateCampaignSettings",
        "status" : "success",
        "msg" : kony.i18n.getLocalizedString("i18n.frmAdManagement.UpdatedSuccessfully"),
        "progressBar" : { show : "fail" } ,
        "isShowAd" : context.showFullScreenAd
      });
    }

    function onError(error) {
      self.presentUserInterface('frmAdManagement', {
        "action": "updateCampaignSettings",
        "status" : "FAILURE",
        "msg" : ErrorInterceptor.errorMessage(error),
        "progressBar" : { show : "fail" } ,
        "isShowAd" : !context.showFullScreenAd
      });
    }
    self.businessController.updateCampaignSettings(context,onSuccess,onError);      
  };

  CampaignModule_PresentationController.prototype.getCampaignSettings = function() {
    var self = this; 
    self.showProgressBarCampaign();
    function onSuccess(response) {
      self.presentUserInterface('frmAdManagement', {
        "action": "getCampaignSettings",
        "status" : "success",
        "progressBar" : { show : "fail" } ,
        "isShowAd" : response.showFullScreenAd
      });
    }

    function onError(error) {
      self.presentUserInterface('frmAdManagement', {
        "action": "getCampaignSettings",
        "status" : "FAILURE",
        "msg" : ErrorInterceptor.errorMessage(error),
        "progressBar" : { show : "fail" } ,
      });
    }
    self.businessController.getCampaignSettings({},onSuccess,onError);      
  };

  CampaignModule_PresentationController.prototype.getAttributes = function() {
    var self = this; 
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.presentUserInterface('frmAdDetails', {
        "action" : "getAttributes",
        "datasets" : self.allDatasets,
        "LoadingScreen" : {"focus" : false}
      });
    }
    function onError(error) {
      self.showToastMessage("frmAdDetails",ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    if(self.allDatasets === null) {
      self.fetchAttributes(onSuccess, onError);
    } else {
      onSuccess();
    }
  };

  CampaignModule_PresentationController.prototype.fetchAttributes = function(onSuccess,onError) {
    var self = this; 
    function onSuccessReponse(response) {
      self.allDatasets = {};
      response.datasets.map(function(obj) {
        let attributes = {};
        /*obj.attributes.forEach(function(attr){
          attr.datasetId = obj.id;
          attributes[attr.id.replace(/_/g,"")] = attr;
        })*/
        self.allDatasets[obj.id.replace(/_/g,"")] = {"id":obj.id, "name" : obj.name, "endpoint" : obj.endpoint, "attributes" : attributes};
      });
      onSuccess();
    }
    self.businessController.getAttributes({},onSuccessReponse,onError);      
  };

  CampaignModule_PresentationController.prototype.getAttributesForViewDetails = function(context, groupName, groupDesc, numberOfUsers) {
    var self = this; 
    self.showProgressBarCampaign();
    function onSuccess(response) {
      self.presentUserInterface('frmAdManagement', {
        "action" : "getAttributes",
        "datasets" : self.allDatasets,
        "data" : context,
        "groupName" : groupName,
        "groupDesc" : groupDesc,
        "numberOfUsers" : numberOfUsers
      });
      self.hideProgressBarCampaign();
    }
    function onError(error) {
      self.showToastMessage("frmAdManagement", {
        "action" : "getAttributes",
        "error" : ErrorInterceptor.errorMessage(error)
      });
      self.hideProgressBarCampaign();
    }
    if(self.allDatasets === null) {
      self.fetchAttributes(onSuccess, onError);
    } else {
      onSuccess();
    }
  };

  CampaignModule_PresentationController.prototype.getAttributeCriteriaTypes = function(context) {
    var self = this; 
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.presentUserInterface('frmAdDetails', {
        "action" : "getAttributeCriteriaTypes",
        "types" : response,
        "LoadingScreen" : {"focus" : false}
      });
    }
    function onError(error) {
      self.showToastMessage("frmAdDetails",ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    self.businessController.getAttributeCriteriaTypes({},onSuccess,onError);      
  };

  CampaignModule_PresentationController.prototype.getCampaignGroups = function() {
    var self = this;
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.presentUserInterface('frmAdDetails', {
        "action": "getCampaignGroups",
        "status" : "success",
        "LoadingScreen" : {"focus" : false}, 
        "groups" : response.groups
      });
    }
    function onError(error) {
      self.showToastMessage("frmAdDetails",ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    self.businessController.getCampaignGroups({},onSuccess,onError);
  };

  CampaignModule_PresentationController.prototype.getAttributesPerCampaignGroup = function(context){
    var self = this;
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.presentUserInterface('frmAdDetails', {
        "action": "getAttributesPerCampaignGroup",
        "status" : "success",
        "LoadingScreen" : {"focus" : false},
        "attributes" : response.attributes
      });
    }
    function onError(error) {
      self.showToastMessage("frmAdDetails",ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    self.businessController.getAttributesPerCampaignGroup(context,onSuccess,onError);
  };

  CampaignModule_PresentationController.prototype.createRole = function(context) {
    var self = this; 
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.presentUserInterface('frmAdDetails', {
        "action" : "createRole",
        "groupDetails" : {
          "groupName" : context.group.name,
          "groupDesc" : context.group.description,
          "noOfUsers" : response.customerCount,
          "groupId" : response.groupId,
        },
        "LoadingScreen" : {"focus" : false}
      });
      var msg = kony.i18n.getLocalizedString("i18n.frmAdManagement.create_Role_Success_Msg") + response.customerCount + " " + (response.customerCount>1? kony.i18n.getLocalizedString("i18n.permission.Users"): kony.i18n.getLocalizedString("i18n.frmAdManagement.User"));
      self.showToastMessage("frmAdDetails", msg, 'SUCCESS');
    }
    function onError(error) {
      self.showToastMessage("frmAdDetails",ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    self.businessController.createRole(context,onSuccess,onError);      
  };

  CampaignModule_PresentationController.prototype.updateCampaignGroup = function(context) {
    var self = this;
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.presentUserInterface('frmAdDetails', {
        "action": "updateCampaignGroup",
        "status" : "success",
        "LoadingScreen" : {"focus" : false}
      });
    }
    function onError(error) {
      self.showToastMessage("frmAdDetails",ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    self.businessController.updateCampaignGroup(context,onSuccess,onError);
  };

  CampaignModule_PresentationController.prototype.campaignNameAndPriorityExistingConflicts = function(context,hasNameChange,hasPriorityChange) {
    var self = this;
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    var isCampaignNameExists = Promisify(self.businessController, 'isCampaignNameExists');
    var isPriorityExists = Promisify(self.businessController, 'fetchCampaignPriorities');
    var promiseArray = [];
    if(hasNameChange) {
      promiseArray.push(isCampaignNameExists);
    }
    if(hasPriorityChange) {
      promiseArray.push(isPriorityExists);
    }
    Promise.all([
      isCampaignNameExists(context),
      isPriorityExists({}),
    ]).then(function (responses) {
      self.presentUserInterface('frmAdDetails', {
        "action" : "campaignNameAndPriorityExistingConflicts",
        "campaignExists" : hasNameChange ? responses[0].campaignExists : false,
        "campaignList" : hasPriorityChange ? responses[1].campaignPriorityList : [],
        "LoadingScreen" : {"focus" : false}
      });
    }).catch(function (res) {
      self.presentUserInterface('frmAdDetails', {
        "action" : "ErrorOccured",
        "LoadingScreen" : {"focus" : false}
      });
      kony.print("unable to fetch preloaded data",res);
    });
  };

  CampaignModule_PresentationController.prototype.getEvents = function() {
    var self = this;
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.presentUserInterface('frmAdDetails', {
        "action": "getEvents",
        "status" : "success",
        "LoadingScreen" : {"focus" : false}, 
        "events" : response.eventTrigger
      });
    }
    function onError(error) {
      self.showToastMessage("frmAdDetails",	ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    self.businessController.getEvents({},onSuccess,onError);
  };

  CampaignModule_PresentationController.prototype.getProductsByProductGroup = function(context) {
    var self = this;
    var frmName = (context.formName && context.formName==="frmAdManagement") ? "frmAdManagement" : "frmAdDetails";
    context = {"productGroups": context.productGroups};
    self.presentUserInterface(frmName, {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.presentUserInterface(frmName, {
        "action": "getProductsByProductGroup",
        "status" : "success",
        "LoadingScreen" : {"focus" : false}, 
        "items" : response.items
      });
    }
    function onError(error) {
      self.showToastMessage(frmName, ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    self.businessController.getProductsByProductGroup(context,onSuccess,onError);
  };

  CampaignModule_PresentationController.prototype.getProfiles = function() {
    var self = this;
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.presentUserInterface('frmAdDetails', {
        "action": "getProfiles",
        "status" : "success",
        "LoadingScreen" : {"focus" : false}, 
        "profiles" : response.allProfiles
      });
    }
    function onError(error) {
      let errorMessage = error.message ? error.message : ErrorInterceptor.errorMessage(error);
      self.showToastMessage("frmAdDetails",errorMessage, 'FAILURE');
    }
    self.businessController.getProfiles({},onSuccess,onError);
  };

  CampaignModule_PresentationController.prototype.createProfile = function(context) {
    var self = this; 
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      context.profileId = response.id;
      self.presentUserInterface('frmAdDetails', {
        "action" : "createProfile",
        "profile" : context,
        "LoadingScreen" : {"focus" : false}
      });
      var msg = "Profile created successfully.";
      self.showToastMessage("frmAdDetails", msg, 'SUCCESS');
    }
    function onError(error) {
      let errorMessage = error.message ? error.message : ErrorInterceptor.errorMessage(error);
      self.showToastMessage("frmAdDetails",errorMessage, 'FAILURE');
    }
    self.businessController.createProfile(context,onSuccess,onError);      
  };

  CampaignModule_PresentationController.prototype.createCampaignMS = function(context) {
    var self = this; 
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.fetchCampaigns({status : "success",msg : kony.i18n.getLocalizedString("i18n.frmAdManagement.CreatedSuccessfully") });
    }
    function onError(error) {
      let errorMessage = error.message ? error.message : ErrorInterceptor.errorMessage(error);
      self.showToastMessage("frmAdDetails", errorMessage, 'FAILURE');
    }
    self.businessController.createCampaignMS(context,onSuccess,onError);      
  };

  CampaignModule_PresentationController.prototype.updateCampaignMS = function(context) {
    var self = this; 
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.fetchCampaigns({status : "success",msg : kony.i18n.getLocalizedString("i18n.frmAdManagement.UpdatedSuccessfully") });
    }
    function onError(error) {
      let errorMessage = error.message ? error.message : ErrorInterceptor.errorMessage(error);
      self.showToastMessage("frmAdDetails",errorMessage, 'FAILURE');
    }
    self.businessController.updateCampaignMS(context,onSuccess,onError);      
  };

  CampaignModule_PresentationController.prototype.getPlaceholders = function() {
    var self = this; 
    this.currentForm = "frmAdDetails";

    function processSuccessResponse(response) {
      var screensDataMap = {};
      response.placeHolders.forEach(function(placeholder){
        let screenObj = screensDataMap[placeholder.placeholderIdentifier] ? screensDataMap[placeholder.placeholderIdentifier] : {};
        let channelObj = screenObj[placeholder.channelSubType] ? screenObj[placeholder.channelSubType] : {"resolutions" : []};
        let resolutions = channelObj.resolutions;
        resolutions.push({
          "imageSize" : placeholder.imageSize,
          "imageResolution" : placeholder.imageResolution,
          "imageScale" : placeholder.imageScale,
          "placeholderId" : placeholder.placeholderId,
          "placeholderName" : placeholder.placeholderName
        });
        screenObj[placeholder.channelSubType] = channelObj;
        screensDataMap[placeholder.placeholderIdentifier] = screenObj;
      });
      self.campaignConfigurations = {"screens" : []};
      for(var screenId in screensDataMap){
        let channels = [];
        for(var channelId in screensDataMap[screenId]){
          channels.push({
            "channelId" : channelId,
            "resolutions" : screensDataMap[screenId][channelId].resolutions
          });
        }
        self.campaignConfigurations.screens.push({
          "screenId" : screenId,
          "channels" : channels
        });
      }
      onSuccess();
    }

    function onSuccess(){
      self.presentUserInterface("frmAdDetails", {
        "action" : "createCampaign",
        "screens" : self.campaignConfigurations.screens
      });
    }

    function onError(response) {
      self.fetchCampaigns({status : "failure",msg : kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorCampaignConfigurations") });
    }
    if(self.campaignConfigurations === null) {
      this.businessController.getPlaceholders({},processSuccessResponse,onError);
    } else {
      onSuccess() ;
    }
  };

  CampaignModule_PresentationController.prototype.assignCampaignPriorities = function(priorities) {
    var self = this;
    self.allPriorities = priorities;
  };

  CampaignModule_PresentationController.prototype.getCampaignPriorities = function(priorities) {
    var self = this;
    return self.allPriorities;
  };

  CampaignModule_PresentationController.prototype.getAllProductGroups = function(context) {
    var self = this;
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.presentUserInterface('frmAdDetails', {
        "action": "getAllProductGroups",
        "status" : "success",
        "LoadingScreen" : {"focus" : false}, 
        "allProductGroups" : response
      });
    }
    function onError(error) {
      self.showToastMessage("frmAdDetails",	ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    self.businessController.getAllProductGroups(context,onSuccess,onError);
  };

  CampaignModule_PresentationController.prototype.fetchConfigurationsAndDatasets = function() {
    var self = this;
    kony.adminConsole.utils.showProgressBar(this.view);
    var promisePlaceholders = Promisify(self.businessController, 'getPlaceholders');
    var promiseAttributes = Promisify(self.businessController, 'getAttributes');

    function placeholdersSuccessResponse(response) {
      var screensDataMap = {};
      response.placeHolder.forEach(function(placeholder) {
        let screenObj = screensDataMap[placeholder.placeholderIdentifier] ? screensDataMap[placeholder.placeholderIdentifier] : {};
        let channelObj = screenObj[placeholder.channelSubType] ? screenObj[placeholder.channelSubType] : {
          "resolutions": []
        };
        let resolutions = channelObj.resolutions;
        resolutions.push({
          "imageSize": placeholder.imageSize,
          "imageResolution": placeholder.imageResolution,
          "imageScale": placeholder.imageScale,
          "placeholderId": placeholder.placeholderId,
          "placeholderName": placeholder.placeholderName
        });
        screenObj[placeholder.channelSubType] = channelObj;
        screensDataMap[placeholder.placeholderIdentifier] = screenObj;
      });
      self.campaignConfigurations = {
        "screens": []
      };
      for (var screenId in screensDataMap) {
        let channels = [];
        for (var channelId in screensDataMap[screenId]) {
          channels.push({
            "channelId": channelId,
            "resolutions": screensDataMap[screenId][channelId].resolutions
          });
        }
        self.campaignConfigurations.screens.push({
          "screenId": screenId,
          "channels": channels
        });
      }
    }

    function datasetsSuccessResponse(response) {
      self.allDatasets = {};
      response.datasets.map(function(obj) {
        self.allDatasets[obj.id.replace(/_/g, "")] = obj;
      });
    }
    let callsToMake = [];
    if(self.campaignConfigurations === null || self.allDatasets === null){
      callsToMake.push(promisePlaceholders({}));
      callsToMake.push(promiseAttributes({}));
    }
    Promise.all(callsToMake).then(function(response){
      if(self.campaignConfigurations === null || self.allDatasets === null) {
        placeholdersSuccessResponse(response[0]);
        datasetsSuccessResponse(response[1]);
      }
      self.currentCampaignFilter = null;
      self.fetchCampaigns();
      kony.adminConsole.utils.hideProgressBar(this.view);
    }).catch(function failureCallback(error) {
      let errorMessage = error.message ? error.message : ErrorInterceptor.errorMessage(error);
      self.presentUserInterface('frmAdManagement', {
        "action": "getAttributes",
        "error": errorMessage
      });
      kony.adminConsole.utils.hideProgressBar(this.view);
    });
  };

  CampaignModule_PresentationController.prototype.editCampaign = function(context, isCopyCampaign) {
    var self = this; 
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    self.presentUserInterface('frmAdDetails', {
      "action" : isCopyCampaign ? "copyCampaign" : "editCampaign",
      "isEdit" : !isCopyCampaign,
      "campaignData" : context,
      "campaignSpecifications" : self.campaignConfigurations,
      "LoadingScreen" : {"focus" : false}
    });
  };

  CampaignModule_PresentationController.prototype.updateStatus = function(context, isViewDetails){
    var self = this;
    self.showProgressBarCampaign();
    function onSuccess(response) {
      self.presentUserInterface('frmAdManagement', {
        "action" : "updateCampaignStatus",
        "status" : "success",
        "isViewDetails" : isViewDetails,
        "msg":kony.i18n.getLocalizedString("i18n.frmAdManagement.UpdatedSuccessfully")
      });
      if(!isViewDetails){
        self.fetchCampaigns();
      }
      self.hideProgressBarCampaign();
    }
    function onError(error) {
      let errorMessage = error.message ? error.message : ErrorInterceptor.errorMessage(error);
      self.presentUserInterface('frmAdManagement', {
        "action" : "updateCampaignStatus",
        "status" : "failure",
        "isViewDetails" : isViewDetails,
        "msg":errorMessage
      });
      self.hideProgressBarCampaign();
    }
    self.businessController.updateCampaignMS(context,onSuccess,onError);      
  };

  CampaignModule_PresentationController.prototype.updateDefaultCampaigns = function(context) {
    var self = this; 
    self.presentUserInterface("frmAdDetails", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.fetchCampaigns({status : "success",msg : kony.i18n.getLocalizedString("i18n.frmAdManagement.UpdatedSuccessfully") });
    }
    function onError(error) {
      self.showToastMessage("frmAdDetails",ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    self.businessController.updateDefaultCampaigns(context,onSuccess,onError);      
  };
  
  CampaignModule_PresentationController.prototype.setCurrentCampaignFilter = function(context) {
    var self = this;
    self.currentCampaignFilter = {};
    self.currentCampaignFilter.statusfilterIndices = context.statusfilterIndices;
    self.currentCampaignFilter.inAscendingOrder = context.inAscendingOrder;
    self.currentCampaignFilter.sortBy = context.sortBy;
    self.currentCampaignFilter.searchText = context.searchText;
  };

  CampaignModule_PresentationController.prototype.getCurrentCampaignFilter = function() {
    var self = this;
    return self.currentCampaignFilter;
  };

  return CampaignModule_PresentationController;
});

define(['Promisify', 'ErrorInterceptor', 'ErrorIsNetworkDown'], function (Promisify, ErrorInterceptor, isNetworkDown) {
  /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
  function ProfileManagement_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.allDatasets = null;
    this.allprofiles = null;
  }

  inheritsFrom(ProfileManagement_PresentationController, kony.mvc.Presentation.BasePresenter);

  /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */

  ProfileManagement_PresentationController.prototype.initializePresentationController = function() {
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

  ProfileManagement_PresentationController.prototype.showToastMessage = function(form,message, status){
    var self = this; 
    self.presentUserInterface(form, {toastModel : {
      message : message,
      status : status
    }, "LoadingScreen" : {"focus" : false} });
  };

  ProfileManagement_PresentationController.prototype.showProfilesForm = function (context) {
    this.currentForm = "frmProfiles";
    this.presentUserInterface('frmProfiles', context);
  };

  ProfileManagement_PresentationController.prototype.getProfiles = function() {
    var self = this;
    self.presentUserInterface("frmProfiles", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.presentUserInterface('frmProfiles', { 
        "profiles" : response.allProfiles
      });
      self.allprofiles = response.allProfiles;
    }
    function onError(error) {
      let errorMessage = error.message ? error.message : ErrorInterceptor.errorMessage(error);
      if(errorMessage === "No Record(s) found for the given ID / Criteria "){ 
        self.presentUserInterface('frmProfiles', { 
          "profiles" : []
        });
        self.allprofiles = [];
      }
      self.showToastMessage("frmProfiles",errorMessage, 'FAILURE');
    }
    self.businessController.getProfiles({},onSuccess,onError);
  };

  ProfileManagement_PresentationController.prototype.getModelAttributes = function() {
    var self = this; 
    return self.allDatasets;
  };

  ProfileManagement_PresentationController.prototype.fetchModelAttributes = function() {
    var self = this; 
    self.presentUserInterface("frmProfiles", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      self.allDatasets = {};
      response.datasets.map(function(obj) {
        self.allDatasets[obj.id.replace(/_/g,"")] = {"id":obj.id, "name" : obj.name, "endpoint" : obj.endpoint, "attributes" : obj.attributes};
      });
      self.presentUserInterface("frmProfiles", {"LoadingScreen" : {"focus" : false}} );
    }
    function onError(error) {
      self.showToastMessage("frmCreateProfile",ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    self.businessController.getAttributes({},onSuccess,onError);      
  };

  ProfileManagement_PresentationController.prototype.getProfileData = function (profileId) {
    var profile = this.allprofiles.filter(function (data) {
      if(data.profileId === profileId){
        return data;
      }
    })[0];
    return profile;
  };

  ProfileManagement_PresentationController.prototype.findProfileName = function (profileName) {
    if(this.allprofiles){
      var profile = this.allprofiles.filter(function (data) {
        if(data.profileName === profileName){
          return data;
        }
      });
      return profile;
    }
    else
      return [];
  };

  ProfileManagement_PresentationController.prototype.showCreateProfile = function () {
    this.currentForm = "frmCreateProfile";
    this.presentUserInterface('frmCreateProfile', {"showCreateProfile": true});
  };

  ProfileManagement_PresentationController.prototype.showEditProfile = function (context) {
    this.currentForm = "frmCreateProfile";
    this.presentUserInterface('frmCreateProfile', {"showEditProfile" : true, "isEdit" : context.isEdit, "profileDetails" : context.profileDetails});
  };

  ProfileManagement_PresentationController.prototype.createProfile = function(context) {
    var self = this; 
    self.presentUserInterface("frmProfiles", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      var msg = kony.i18n.getLocalizedString("i18n.ProfileManagement.profileCreateSuccessMsg");
      self.getProfiles();
      self.showToastMessage("frmProfiles", msg, 'SUCCESS');
    }
    function onError(error) {
      self.getProfiles();
      let errorMessage = error.message ? error.message : ErrorInterceptor.errorMessage(error);
      self.showToastMessage("frmProfiles", errorMessage, 'FAILURE');
    }
    self.businessController.createProfile(context,onSuccess,onError);      
  };

  ProfileManagement_PresentationController.prototype.updateProfile = function(context) {
    var self = this; 
    self.presentUserInterface("frmProfiles", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      var msg = kony.i18n.getLocalizedString("i18n.ProfileManagement.profileUpdateSuccessMsg");
      if(context.isEdit){
        msg = kony.i18n.getLocalizedString("i18n.ProfileManagement.profileUpdateSuccessMsg");
        if(context.numberOfUsers && context.numberOfUsers>=0)
          msg = msg.substring(0, msg.length-1) + " with " + context.numberOfUsers + " users."
      }
      else if(context.softDeleteIndicator === "Y")
        msg = kony.i18n.getLocalizedString("i18n.ProfileManagement.profileDeleteSuccessMsg");
      else if(context.profileStatus === "Deactive")
        msg = kony.i18n.getLocalizedString("i18n.ProfileManagement.profileDeactivateSuccessMsg");
      else if(context.profileStatus === "Active")
        msg = kony.i18n.getLocalizedString("i18n.ProfileManagement.profileActivateSuccessMsg");
      self.getProfiles();
      self.showToastMessage("frmProfiles", msg, 'SUCCESS');
    }
    function onError(error) {
      self.getProfiles();
      let errorMessage = error.message ? error.message : ErrorInterceptor.errorMessage(error);
      self.showToastMessage("frmProfiles", errorMessage, 'FAILURE');
    }
    self.businessController.updateProfile(context,onSuccess,onError);      
  };
  
  ProfileManagement_PresentationController.prototype.getAndUpdateUsersForSegment = function(context) {
    var self = this; 
    self.presentUserInterface("frmProfiles", {"LoadingScreen" : {"focus" : true}} );
    function onSuccess(response) {
      var msg = kony.i18n.getLocalizedString("i18n.ProfileManagement.profileUsersNumFetchSuccessMsg");
      self.presentUserInterface('frmProfiles', { 
        "usercount" : response.usercount,
        "usercountSuccess" : response.Success
      });
      self.showToastMessage("frmProfiles", msg, 'SUCCESS');
    }
    function onError(error) {
      let errorMessage = error.dbpErrMsg ? error.dbpErrMsg : ErrorInterceptor.errorMessage(error);
      self.showToastMessage("frmProfiles", errorMessage, 'FAILURE');
    }
    self.businessController.getAndUpdateUsersForSegment(context,onSuccess,onError);      
  };


  return ProfileManagement_PresentationController;
});
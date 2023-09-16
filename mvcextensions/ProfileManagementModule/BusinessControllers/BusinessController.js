define([], function () { 

  function ProfileManagement_BusinessController() { 
    kony.mvc.Business.Controller.call(this); 
  } 

  inheritsFrom(ProfileManagement_BusinessController, kony.mvc.Business.Delegator); 

  ProfileManagement_BusinessController.prototype.initializeBusinessController = function() { 
  }; 

  ProfileManagement_BusinessController.prototype.getProfiles = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ProfileMangementManager").businessController.getProfiles(context, onSuccess, onError);
  };

  ProfileManagement_BusinessController.prototype.execute = function(command) { 
    kony.mvc.Business.Controller.prototype.execute.call(this, command);
  };

  ProfileManagement_BusinessController.prototype.getAttributes = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ProfileMangementManager").businessController.getAttributes(context, onSuccess, onError);
  };

  ProfileManagement_BusinessController.prototype.createProfile = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ProfileMangementManager").businessController.createProfile(context, onSuccess, onError);
  };

  ProfileManagement_BusinessController.prototype.updateProfile = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ProfileMangementManager").businessController.updateProfile(context, onSuccess, onError);
  };
  
  ProfileManagement_BusinessController.prototype.getAndUpdateUsersForSegment = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ProfileMangementManager").businessController.getAndUpdateUsersForSegment(context, onSuccess, onError);
  };

  return ProfileManagement_BusinessController;

});
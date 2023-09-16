define(['ModelManager'], function (ModelManager) { 

  function ProfileMangementManager() { 
    kony.mvc.Business.Controller.call(this); 
  } 

  inheritsFrom(ProfileMangementManager, kony.mvc.Business.Delegator); 

  ProfileMangementManager.prototype.initializeBusinessController = function() { 

  }; 

  ProfileMangementManager.prototype.getProfiles = function(context, onSuccess, onError) {
    ModelManager.invoke('profile', 'getProfiles', context, onSuccess, onError);
  };
  
  ProfileMangementManager.prototype.getAttributes = function(context, onSuccess, onError) {
    ModelManager.invoke('attribute', 'getAttributes', context, onSuccess, onError);
  };
  
  ProfileMangementManager.prototype.createProfile = function(context, onSuccess, onError) {
    ModelManager.invoke('profile', 'createProfile', context, onSuccess, onError);
  };

  ProfileMangementManager.prototype.updateProfile = function(context, onSuccess, onError) {
    ModelManager.invoke('profile', 'updateProfile', context, onSuccess, onError);
  };
  
    ProfileMangementManager.prototype.getAndUpdateUsersForSegment = function(context, onSuccess, onError) {
    ModelManager.invoke('profile', 'getAndUpdateUsersForSegment', context, onSuccess, onError);
  };

  return ProfileMangementManager;

});
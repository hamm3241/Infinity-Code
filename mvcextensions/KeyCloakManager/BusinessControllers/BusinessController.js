define(['ModelManager'], function (ModelManager) {
  /**
     * KeyCloakManager manages models: Users(Key cloak)
     */
  function KeyCloakManager() {
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(KeyCloakManager, kony.mvc.Business.Delegator);

  KeyCloakManager.prototype.initializeBusinessController = function () {

  };
  KeyCloakManager.prototype.getKeycloakUsers = function(context, onSuccess, onError){
    ModelManager.invoke('KeycloakUsers', 'getKeycloakUsers', context, onSuccess, onError);
  };
  return KeyCloakManager;
});
define(['ModelManager'], function (ModelManager) {
  /**
     * AppConfigurationsManager manages models: LoginType
     */
  function AppConfigurationsManager() {
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(AppConfigurationsManager, kony.mvc.Business.Delegator);

  AppConfigurationsManager.prototype.initializeBusinessController = function () {

  };
  AppConfigurationsManager.prototype.getLoginTypeConfiguration = function(context, onSuccess, onError){
    ModelManager.invoke('LoginType', 'getLoginTypeConfiguration', context, onSuccess, onError);
  };
  AppConfigurationsManager.prototype.getAttribute = function(context, onSuccess, onError){
    ModelManager.invoke('LoginType', 'getAttribute', context, onSuccess, onError);
  };
  return AppConfigurationsManager;
});
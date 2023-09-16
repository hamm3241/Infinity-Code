define([], function(){
    function AppConfigurationsManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(AppConfigurationsManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    AppConfigurationsManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return AppConfigurationsManager_PresentationController;
});
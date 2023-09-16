define([], function(){
    function AlertAndAlertTypesManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(AlertAndAlertTypesManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    AlertAndAlertTypesManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return AlertAndAlertTypesManager_PresentationController;
});
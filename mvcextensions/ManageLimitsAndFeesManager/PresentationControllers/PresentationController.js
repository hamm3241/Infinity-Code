define([], function(){
    function ManageLimitsAndFeesManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(ManageLimitsAndFeesManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    ManageLimitsAndFeesManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return ManageLimitsAndFeesManager_PresentationController;
});
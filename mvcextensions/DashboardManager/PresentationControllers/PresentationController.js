define([], function(){
    function DashboardManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(DashboardManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    DashboardManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return DashboardManager_PresentationController;
});
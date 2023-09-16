define([], function(){
    function StaticContentManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(StaticContentManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    StaticContentManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return StaticContentManager_PresentationController;
});
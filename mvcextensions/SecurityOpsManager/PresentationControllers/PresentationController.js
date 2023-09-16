define([], function(){
    function SecurityOpsManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(SecurityOpsManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    SecurityOpsManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return SecurityOpsManager_PresentationController;
});
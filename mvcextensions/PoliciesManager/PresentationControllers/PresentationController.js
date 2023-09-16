define([], function(){
    function PoliciesManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(PoliciesManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    PoliciesManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return PoliciesManager_PresentationController;
});
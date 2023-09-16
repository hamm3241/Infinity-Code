define([], function(){
    function InternalusersManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(InternalusersManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    InternalusersManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return InternalusersManager_PresentationController;
});
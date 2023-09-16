define([], function(){
    function CustServiceManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(CustServiceManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    CustServiceManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return CustServiceManager_PresentationController;
});
define([], function(){
    function AccountRequestsManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(AccountRequestsManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    AccountRequestsManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return AccountRequestsManager_PresentationController;
});
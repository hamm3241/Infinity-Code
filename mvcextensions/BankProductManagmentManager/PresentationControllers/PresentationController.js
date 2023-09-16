define([], function(){
    function BankProductManagmentManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(BankProductManagmentManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    BankProductManagmentManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return BankProductManagmentManager_PresentationController;
});
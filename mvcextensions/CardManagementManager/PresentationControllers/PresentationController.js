define([], function(){
    function CardManagementManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(CardManagementManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    CardManagementManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return CardManagementManager_PresentationController;
});
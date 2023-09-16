define([], function(){
    function CustomerManagementManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(CustomerManagementManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    CustomerManagementManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return CustomerManagementManager_PresentationController;
});
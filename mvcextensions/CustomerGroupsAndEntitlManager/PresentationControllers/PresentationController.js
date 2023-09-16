define([], function(){
    function CustomerGroupsAndEntitlManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(CustomerGroupsAndEntitlManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    CustomerGroupsAndEntitlManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return CustomerGroupsAndEntitlManager_PresentationController;
});
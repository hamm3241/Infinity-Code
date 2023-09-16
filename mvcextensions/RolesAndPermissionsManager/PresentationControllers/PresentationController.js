define([], function(){
    function RolesAndPermissionsManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(RolesAndPermissionsManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    RolesAndPermissionsManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return RolesAndPermissionsManager_PresentationController;
});
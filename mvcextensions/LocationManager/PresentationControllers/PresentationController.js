define([], function(){
    function LocationManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(LocationManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    LocationManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return LocationManager_PresentationController;
});
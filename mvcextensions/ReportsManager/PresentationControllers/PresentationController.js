define([], function(){
    function ReportsManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(ReportsManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    ReportsManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return ReportsManager_PresentationController;
});
define([], function(){
    function MasterDataManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(MasterDataManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    MasterDataManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return MasterDataManager_PresentationController;
});
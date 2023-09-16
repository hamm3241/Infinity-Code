define([], function(){
    function AuditLogsManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(AuditLogsManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    AuditLogsManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return AuditLogsManager_PresentationController;
});
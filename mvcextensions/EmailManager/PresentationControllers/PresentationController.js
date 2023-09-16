define([], function(){
    function EmailManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(EmailManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    EmailManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return EmailManager_PresentationController;
});
define([], function(){
    function TermsAndConditionsManager_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(TermsAndConditionsManager_PresentationController, kony.mvc.Presentation.BasePresenter);

    TermsAndConditionsManager_PresentationController.prototype.initializePresentationController = function () {
    };
    return TermsAndConditionsManager_PresentationController;
});
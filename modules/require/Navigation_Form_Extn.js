define(['MenuModel','Navigation_Presentation_Extn','Navigation_BrowserBackBehavior'], function (Menu, Navigation_Presentation_Extns, BrowserBackBehavior) {
    var isLeftMenuPresentInForm = function(view){
        return typeof view.leftMenuNew === 'object' && typeof view.leftMenuNew.updateMenu === 'function';
    };
    return {
        updateLeftMenu: function (viewModel) {
            var leftMenuTag = Navigation_Presentation_Extns.getLeftMenuTag();
            if (typeof viewModel === 'object'&& viewModel !=null &&
                typeof viewModel[leftMenuTag] === 'object' &&
                viewModel[leftMenuTag] instanceof Menu && isLeftMenuPresentInForm(this.view)) {
                this.view.leftMenuNew.updateMenu(viewModel[leftMenuTag]);
            }
            //TODO: Remove this quick fix for the network down message
            if(typeof viewModel === 'object'&& viewModel !=null &&
                typeof viewModel['NetworkDownMessage'] === 'object' ){
                    this.view.toastMessage.showErrorToastMessage(
                        'Unable to connect, please check your network connectivity and try again.',
                        this
                    );
                    kony.adminConsole.utils.hideProgressBar(this.view);
            }
        },
        canNavigateBack : Navigation_Presentation_Extns.canNavigateBack,
        navigateBack : Navigation_Presentation_Extns.navigateBack,

        /**
         * @event browser back
         * @extends MDAFormController
         */
        onBrowserBack : BrowserBackBehavior
    };
});
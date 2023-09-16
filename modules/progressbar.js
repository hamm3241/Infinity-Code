kony = kony || {};
kony.adminConsole = kony.adminConsole || {};
kony.adminConsole.utils = kony.adminConsole.utils || {};
kony.adminConsole.utils.LOADING_TIMEOUT_IN_SEC = 40;

kony.adminConsole.utils.showProgressBar = function (view) {
    if(view === null || view === undefined) {
        return;
    }
    if ('flxLoading' in view) {
        view['flxLoading'].setVisibility(true);
        if(view.flxLoading.timeoutHandle)clearTimeout(view.flxLoading.timeoutHandle);
        view.flxLoading.timeoutHandle = setTimeout(function(){
          kony.adminConsole.utils.hideProgressBar(view);
        }, kony.adminConsole.utils.LOADING_TIMEOUT_IN_SEC*1000);
    }
    else {
        kony.print("No Progress bar available in the form. Add a progress bar with widget name flxLoading");
    }
};

kony.adminConsole.utils.hideProgressBar = function (view) {
    if(view === null || view === undefined) {
        return;
    }
    if ('flxLoading' in view && view['flxLoading'].isVisible) {
        view['flxLoading'].setVisibility(false);
        if(view.flxLoading.timeoutHandle)clearTimeout(view.flxLoading.timeoutHandle);
    }
};
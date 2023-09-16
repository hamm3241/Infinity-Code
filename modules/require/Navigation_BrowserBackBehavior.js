define(function(){

    /**
     * @requires controller.canNavigateBack() = true
     * @requires controller.doesUserHavePendingEdits = ()=>boolean
     * @requires controller.getUserConfirmationToCancelEdits = (navigateBack)=>void
     * @param {MDAFormController} controller 
     */
    var controllerHandlesEditsConfirmation = function (controller, navigate, cancel) {
        if (controller.doesUserHavePendingEdits()) {
            controller.getUserConfirmationToCancelEdits(navigate, cancel);
        } else {
            navigate();
        }
    };
    var getVisibleWidget = (function(){
        var getKeyFrom = function(object){
            return function(key){
                return object[key];
            };
        };
        var isVisible = function(widget){
            return widget.isVisible;
        };
        var getVisibleWidget = function(isMatch, root){
            if(isMatch(root)){
                return root;
            }
            if(Array.isArray(root.children)){
                var visibleChildren = root.children.map(getKeyFrom(root)).filter(isVisible);
                for (var i = 0; i < visibleChildren.length; i++) {
                    var child = visibleChildren[i];
                    var matchedWidget = getVisibleWidget(isMatch, child);
                    if (typeof matchedWidget === 'object') {
                        return matchedWidget;
                    }
                }
            }
        };
        return getVisibleWidget;
    })();
    var isButtonWithText = function(widget, text){
        return widget.wType === "Button" && widget.text.toLowerCase().indexOf(text) > -1;
    };
    var matchUpdateButton = function(widget){
        return isButtonWithText(widget, kony.i18n.getLocalizedString('i18n.frmOutageMessageController.UPDATE').toLowerCase());
    };
    var matchSaveButton = function(widget){
        return isButtonWithText(widget, kony.i18n.getLocalizedString('i8n.Button.Save').toLowerCase());
    };
    var matchNextButton = function(widget){
        return isButtonWithText(widget, kony.i18n.getLocalizedString('i8n.Button.Next').toLowerCase());
    };
    var matchCancelButton = function(widget){
        return isButtonWithText(widget, kony.i18n.getLocalizedString('i8n.Button.Cancel').toLowerCase());
    };
    var matchBackToLoans = function(widget){
        return isButtonWithText(widget,kony.i18n.getLocalizedString('i18n.Applications.BackToLoans').toLowerCase());
    }
    var viewHasEdits = function(view){
        //check if View has edits - user seeing screen with cancel and save buttons
        var checkExists = function(isMatch, root){
            return typeof getVisibleWidget(isMatch, root) === 'object';
        };
        return checkExists(matchCancelButton, view) &&
            (checkExists(matchSaveButton, view) || checkExists(matchNextButton, view) ||  checkExists(matchUpdateButton, view));
    };
    var getCancelButtonAction = function(view){
        var cancelButton = getVisibleWidget(matchCancelButton, view);
		var backToLoansFlex = getVisibleWidget(matchBackToLoans,view);
		if (typeof backToLoansFlex === 'object' && typeof backToLoansFlex.onClick === 'function') {
            return backToLoansFlex.onClick;
        }
        if (typeof cancelButton === 'object' && typeof cancelButton.onClick === 'function') {
            return cancelButton.onClick;
        }
    };
    var listOf = function(first, next, whileTrue){
        var list = [first];
        var current = first;
        while(whileTrue(current)){
            current = next(current);
            list.push(current);
        }
        return list;
    };
    /**
     * @param {widget{isVisible : boolean, parent : widget|enclosingFlex}} widget 
     * @param {widget} enclosingFlex if this is given make sure it is a valid ancestor of the widget
     * @returns {boolean}
     */
    var isWidgetVisible = function(widget, enclosingFlex){
        if(enclosingFlex){
            var listOfParentFlexes = listOf(widget, function getParent(widget){
                    return widget.parent;
                }, function (widget){
                    return widget !== enclosingFlex &&
                        typeof widget.parent === 'object';
                });
            return listOfParentFlexes.every(function(flex){
                return flex.isVisible;
            });
        }else{
            return widget.isVisible;
        }
    };

    /**
     * Holds the popup components widget configuration
     */
    var popUpConfig = {
        root: "popUpCancelEdits"//this.view.popUpCancelEdits
    };

    /**
     * @requires controllerHasValidPopupConfig(controller) = true
     * @param {MDAFormController} controller 
     * @returns {boolean} has valid popup config
     */
    var configuredPopupExists = function(controller){
        return typeof controller.view[popUpConfig.root] === 'object';
    };
    /**
     * @param {MDAFormController} controller 
     * @returns {boolean} can get confirmation in this form (has the required popup and config)
     */
    var canGetUserConfirmation = function(controller){
        //check if View has component popUp that can be used to get user confirmation
        return configuredPopupExists(controller);
    };
    /**
     * Will run all the functions provided
     * @param {Function[]} listOfFuncs 
     */
    var executeAll = function(listOfFuncs){
        listOfFuncs.forEach(function(fn){fn();});
    };
    /**
     * @requires canGetUserConfirmation(controller) = true
     * @param {MDAFormController} controller 
     * @param {Function} navigateBack 
     */
    var getUserConfirmation = function(controller, navigateBack, cancel){
        var changeReversers = [];
        var change = function(object, key, value){
            var oldValue = typeof object[key] !== 'undefined' ? object[key] : undefined;
            object[key] = value;
            changeReversers.push(function reverseChange(){
                object[key] = oldValue;
            });
        };
        var reverseChanges = function(){
            executeAll(changeReversers);
            controller.view.forceLayout();
        };
        var popUpComponent = controller.view[popUpConfig.root];
        var getParent = function(widget){return widget.parent;};
        var notReachedForm = function(flex){return flex !== controller.view;};
        var popUpToFormParentsList = listOf(popUpComponent, getParent, notReachedForm);
        var notVisible = function(flex){return flex.isVisible === false;};
        //show popup to user - change the message and buttons to get user confirmation
        popUpToFormParentsList.filter(notVisible).forEach(
            function(flex){
                change(flex, 'isVisible', true);
            }
        );
        //if user clicks - yes -> navigate, no -> close popup //no matter what reverse any changes to the UI
        var cancelNavigation = function(){
            popUpComponent.clearPopUpActions();
            reverseChanges();
            cancel();
        };
        var continueNavigation = function(){
            popUpComponent.clearPopUpActions();
            reverseChanges();
            navigateBack();
        };
        popUpComponent.setPopUpActions(continueNavigation, cancelNavigation);
        controller.view.forceLayout();
    };

    var breadCrumbButtonsInPriorityOrder = ['btnPreviousPage1','btnPreviousPage','btnBackToMain'];
    var breadCrumbComponentName = 'breadcrumbs';
    var getBreadCrumbBackAction = function(view){
        if(typeof view[breadCrumbComponentName] !== 'object'){
            //Check if the form has the breadCrumb Component
            return;
        }
        if(isWidgetVisible(view[breadCrumbComponentName], view)){
            var breadCrumbPrevButton = breadCrumbButtonsInPriorityOrder.find(function visibleButton(btnName){
                return isWidgetVisible(view[breadCrumbComponentName][btnName], view[breadCrumbComponentName]);
            });
            if(typeof breadCrumbPrevButton === 'string' &&
             typeof view[breadCrumbComponentName][breadCrumbPrevButton] === 'object'){
                return view[breadCrumbComponentName][breadCrumbPrevButton].onClick;
            }
        }
    };
    var getLocalGoBackAction = function(controller){
        if(typeof controller.customNavigateBack === 'function'){
            return controller.customNavigateBack;
        }else{
            if(typeof getCancelButtonAction(controller.view) === 'function'){
                return getCancelButtonAction(controller.view);
            }else if(typeof getBreadCrumbBackAction(controller.view) === 'function'){
                return getBreadCrumbBackAction(controller.view);
            }
        }
    };
    var canGoBack = function(controller){
        if(typeof getLocalGoBackAction(controller) === 'function'){
            return true;
        }
        return controller.canNavigateBack();
    };
    var goBack = function(controller){
        var localNavigateBack = getLocalGoBackAction(controller);
        if(typeof localNavigateBack === 'function'){
            localNavigateBack();
        }else{
            controller.navigateBack();
        }
    };

    /**
     * @requires this.navigateBack -> from Navigation Form Extns
     * @requires callingContext - MDAFormController
     */
    return function onBrowserBack(){
        var self = this;
        if(this.inBrowserBackAction){
            return;
        }
        this.inBrowserBackAction = true;
        var navigate = function(){
            self.inBrowserBackAction = false;
            goBack(self);
        };
        var cancel = function(){
            self.inBrowserBackAction = false;
        };
        try{
            if(canGoBack(this)){
                if(typeof this.doesUserHavePendingEdits === 'function' &&
                    typeof this.getUserConfirmationToCancelEdits === 'function'){
                    controllerHandlesEditsConfirmation(this, navigate, cancel);
                }else if(viewHasEdits(this.view) && canGetUserConfirmation(this)){
                    //Auto Handle - Getting User Confirmation to loose edits
                    getUserConfirmation(this, navigate, cancel);
                }else{
                    navigate();
                }
            }
        }catch(e){
            self.inBrowserBackAction = false;
            throw e;
        }
    };
});
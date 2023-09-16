define(function () {
	return {

		CSRAssistInnerHTML: "<!DOCTYPE html>  <html>  <body>    <iframe id=\"CSRiframe\" style='width: %width%px; height: %height%px; overflow: hidden; scrolling: no; scrollbar: no; border: 0px;'    src=\"%URL%\">    <p>Your browser does not support iframes.</p>  </iframe>    </body>  </html>",
		claimsRefreshTimer: null,

		openCSRAssistWindow: function (formInstance, currentAction, additionalData) {
			this.view.lblInitializeAssist.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Initiating_assist");
			this.view.CSRBrowser.setVisibility(false);
			this.view.flxCSRAssistLoading.setVisibility(true);
			this.view.setVisibility(true);
			this.view.forceLayout();
			this.view.lblInitializeAssist.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Authenticating");
			var payload = {
				"customerid": formInstance.presenter.getCurrentCustomerDetails().Customer_id,
				"currentAction": currentAction
			}
			if (additionalData && additionalData.Loan_id) {
				payload["Loan_id"] = additionalData.Loan_id;
			}
			if (additionalData && additionalData.Loan_Type) {
				payload["Loan_Type"] = additionalData.Loan_Type;
			}
            if (additionalData && additionalData.account_id) {
				payload["accountId"] = additionalData.account_id;
			}
			formInstance.presenter.authorizeCSRAssist(payload);
			formInstance.view.forceLayout();
		},

		userLocked: function (formInstance) {
			formInstance.view.CSRAssist.flxCSRAssistLoading.setVisibility(false);
			formInstance.view.CSRAssist.setVisibility(false);
			formInstance.view.forceLayout();
			var closeAction = function () { };
			formInstance.AdminConsoleCommonUtils.openErrorPopup({
				header: kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.UnabletoLaunchAssist"),
				message: kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.User_is_locked"),
				closeAction: closeAction,
				closeMsg: 'CLOSE'
			}, formInstance);
		},

		successfulOnlineBankingLogin: function (URL, formInstance) {
			this.view.flxCSRAssistLoading.setVisibility(false);
			this.view.CSRBrowser.setVisibility(true);
			this.view.setVisibility(true);
			this.view.forceLayout();
			this.view.CSRBrowser.needScroller = false;
			formInstance.view.forceLayout();

			//Diable the client side idle timeout
			function deregisterCompletionCallback() { }
			var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.AuthModule"));
			authModule.businessController.deregisterIdleTimeout({}, deregisterCompletionCallback);

			//Start a timer to auto refresh Customer 360 claims token
			var refreshClaims = function () {
				authModule.businessController.forceRefreshClaimsToken();
			};
			claimsRefreshTimer = setInterval(refreshClaims, 5000);

			//Open an iFrame
			var innerHTML = this.CSRAssistInnerHTML.replace("%URL%", URL)
				.replace("%width%", (this.view.frame.width) - 35)
				.replace("%height%", (this.view.frame.height) - 35);

			this.view.CSRBrowser.htmlString = innerHTML;
			this.view.forceLayout();
		},

		failureOnlineBankingLogin: function (formInstance) {
			this.view.flxCSRAssistLoading.setVisibility(false);
			this.view.setVisibility(false);
			this.view.forceLayout();
			var closeAction = function () { };
			formInstance.AdminConsoleCommonUtils.openErrorPopup({
				header: kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.UnabletoLaunchAssist"),
				message: kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Unexpected_error_occurred"),
				closeAction: closeAction,
				closeMsg: 'CLOSE'
			}, formInstance);
		},

		onlineBankingLogin: function (OnlineBankingLogin, formInstance) {
			if (OnlineBankingLogin === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.FAILED")) {
				this.failureOnlineBankingLogin(formInstance);
			} else if (OnlineBankingLogin === "USER_LOCKED") {
				this.userLocked(this, formInstance);
			} else {
				this.view.lblInitializeAssist.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Authenticated_successfully");
				this.successfulOnlineBankingLogin(OnlineBankingLogin.BankingURL, formInstance);
			}
		},

		setFlowActionsForCSRAssist: function () {
			var scopeObj = this;
			this.view.flxClose.onClick = function () {
				//Hide the CSR assist window
				scopeObj.view.setVisibility(false);

				//Enable the client side idle timeout
				var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.AuthModule"));
				authModule.presentationController.setIdleTimeout();

				//Clear timer for force claims token refresh
				clearInterval(claimsRefreshTimer);

				//Log the CSR assist close event
				var CustomerManagementPresentation = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule").presentationController;
				if (CustomerManagementPresentation.getCurrentCustomerDetails() != null) {
					CustomerManagementPresentation.CSRAssistLogCloseEvent({
						"customerid": CustomerManagementPresentation.getCurrentCustomerDetails().Customer_id,
						"customerUsername": CustomerManagementPresentation.getCurrentCustomerDetails().Username
					});
				}

			};
		}
	};
});
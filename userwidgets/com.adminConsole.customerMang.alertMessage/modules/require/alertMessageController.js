define(function() {
  var CustomerManagementModulePresenter = null;

  function setGeneralInformationAlertMessage(formInstance, LockedInfo, customerRequestAndNotificationCount) {
    setDefaultData(formInstance, this);
    this.view.setVisibility(false);
    
    if (customerRequestAndNotificationCount && LockedInfo) {
      showCustomerRequestAndNotificationCount(customerRequestAndNotificationCount, this);
      showLockInfo(LockedInfo, this);

      this.view.flxRow1.top = "15%";
      this.view.flxRow1.height = "35%";
      this.view.fonticonBullet1.setVisibility(true);
      this.view.flxRow1.setVisibility(true);
      this.view.flxRow2.height = "35%";
      this.view.flxRow2.bottom = "15%";
      this.view.fonticonBullet2.setVisibility(true);
      this.view.flxRow2.setVisibility(true);
      this.view.height = "70px";
      this.view.setVisibility(true);

    } else if (customerRequestAndNotificationCount) {
      showCustomerRequestAndNotificationCount(customerRequestAndNotificationCount, this);

      this.view.flxRow1.setVisibility(false);
      this.view.flxRow2.height = "100%";
      this.view.flxRow2.bottom = "0%";
      this.view.fonticonBullet2.setVisibility(false);
      this.view.flxRow2.setVisibility(true);
      this.view.height = "50px";
      this.view.setVisibility(true);

    } else if (LockedInfo) {
      showLockInfo(LockedInfo, this);

      this.view.flxRow2.setVisibility(false);
      this.view.fonticonBullet1.setVisibility(false);
      this.view.flxRow1.top = "0%";
      this.view.flxRow1.height = "100%";
      this.view.flxRow1.setVisibility(true);
      this.view.height = "50px";
      this.view.setVisibility(true);

    }
    if(formInstance.computeandSetToolTipHeight){
      formInstance.computeandSetToolTipHeight(formInstance);
    }
    this.view.forceLayout();
  }

  function showLockInfo(LockedInfo, self) {
    self.view.lblData.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.LockInformation")
      .replace("%lockedOn%", LockedInfo.lockedOn)
      .replace("%unlockedOn%", LockedInfo.unlockedOn);

  }

  function showCustomerRequestAndNotificationCount(customerRequestAndNotificationCount, self) {
    var requestCount = parseInt(customerRequestAndNotificationCount.requestCount);
    var notificationCount = parseInt(customerRequestAndNotificationCount.notificationCount);
    if (requestCount > 0 || notificationCount > 0) {
      self.view.setVisibility(true);
      self.view.lblData2.text = "";
      self.view.lblData1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.requestsAndNotificationsCountPrefix");
      if (requestCount > 0) {
        self.view.btnDataLink1.text = requestCount + kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Active_requests");
        self.view.btnDataLink1.setVisibility(true);
      } else {
        self.view.btnDataLink1.setVisibility(false);
      }
      if (notificationCount > 0) {
        self.view.btnDataLink2.text = notificationCount +" "+ kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.notificationsCount");
        self.view.btnDataLink2.setVisibility(true);
      } else {
        self.view.btnDataLink2.setVisibility(false);
      }
      if (requestCount > 0 && notificationCount > 0) {
        self.view.lblData2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.requestsAndNotificationsCountSufix");
        self.view.lblData2.setVisibility(true);
      } else {
        self.view.lblData2.setVisibility(false);
      }
    }
  }
  function setDefaultData(formInstance, self){
    CustomerManagementModulePresenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule").presentationController;
    setFlowActions(formInstance, self);
  }

  function setFlowActions(formInstance, self){

    self.view.btnDataLink1.onClick = function () {
      CustomerManagementModulePresenter.alertMessageRequestOnClick();
    };
    self.view.btnDataLink2.onClick = function () {
      CustomerManagementModulePresenter.alertMessageNotificationOnClick();
    };
  }
  
	return {
    setGeneralInformationAlertMessage: setGeneralInformationAlertMessage
	};
});